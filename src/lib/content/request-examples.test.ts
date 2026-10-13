import { describe, expect, mock, test } from "bun:test";
import { getConceptBySlug } from "@/lib/content/concepts";
import { getRecipeBySlug } from "@/lib/content/recipes";
import { getRoadmap, getRoadmapLessonLocations } from "@/lib/content/roadmaps";

const transpiler = new Bun.Transpiler({ loader: "ts" });
type FetchRequest = (url: string, options: RequestInit) => Promise<Response>;
type UserLoader = (id: string, signal: AbortSignal) => Promise<unknown>;
type AuthenticatedGet = (path: string) => Promise<Response>;

function publishedCode(kind: "concept" | "recipe", slug: string): string {
  const entry =
    kind === "concept" ? getConceptBySlug(slug) : getRecipeBySlug(slug);
  const code = entry?.implementations["react-native"]?.code;
  if (!code) throw new Error(`Missing published code: ${kind}/${slug}`);
  return code;
}

// Execute the published snippets with controlled dependencies, without changing globals.
function compileExample(
  code: string,
  dependencies: Record<string, unknown>,
  functionName: string,
): unknown {
  return new Function(
    ...Object.keys(dependencies),
    transpiler.transformSync(code) + "\nreturn " + functionName + ";",
  )(...Object.values(dependencies));
}

function createSession(
  fetch: FetchRequest,
  refresh: () => Promise<string>,
  signOut: () => void,
): AuthenticatedGet {
  const create = compileExample(
    publishedCode("recipe", "refresh-token"),
    { fetch },
    "createAuthenticatedGet",
  ) as (
    token: string,
    refresh: () => Promise<string>,
    signOut: () => void,
  ) => AuthenticatedGet;
  return create("expired", refresh, signOut);
}

describe("published request examples", () => {
  test("fetch uses an absolute URL, encodes the ID, and forwards cancellation", async () => {
    const user = { id: "user/42", name: "An" };
    const fetch = mock(async () => Response.json(user));
    const load = compileExample(
      publishedCode("concept", "async"),
      { fetch },
      "loadUser",
    ) as UserLoader;
    const controller = new AbortController();

    expect(await load(user.id, controller.signal)).toEqual(user);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/users/user%2F42",
      { signal: controller.signal },
    );
  });

  test.each([401, 500])(
    "fetch rejects HTTP %i instead of returning JSON",
    async (status) => {
      const load = compileExample(
        publishedCode("concept", "async"),
        { fetch: async () => Response.json({}, { status }) },
        "loadUser",
      ) as UserLoader;
      await expect(load("42", new AbortController().signal)).rejects.toThrow(
        "HTTP " + status,
      );
    },
  );

  test.each([
    new TypeError("Offline"),
    new DOMException("Canceled", "AbortError"),
  ])(
    "fetch propagates transport and cancellation failures: %s",
    async (error) => {
      const load = compileExample(
        publishedCode("concept", "async"),
        {
          fetch: async () => {
            throw error;
          },
        },
        "loadUser",
      ) as UserLoader;
      await expect(load("42", new AbortController().signal)).rejects.toBe(
        error,
      );
    },
  );

  test("Axios configures the same endpoint, forwards the signal, and preserves failures", async () => {
    const user = { id: "user/42", name: "An" };
    const get = mock(async () => ({ data: user }));
    const create = mock(() => ({ get }));
    const load = compileExample(
      publishedCode("concept", "api-request"),
      { axios: { create } },
      "getUser",
    ) as UserLoader;
    const signal = new AbortController().signal;

    expect(create).toHaveBeenCalledWith({
      baseURL: "https://api.example.com/",
    });
    expect(await load(user.id, signal)).toEqual(user);
    expect(get).toHaveBeenCalledWith("users/user%2F42", { signal });
    const error = new Error("Request failed");
    get.mockImplementation(async () => {
      throw error;
    });
    await expect(load(user.id, signal)).rejects.toBe(error);
  });

  test.each(["success", "failure"])(
    "profile ignores a late %s after cancellation",
    async (outcome) => {
      const response = Promise.withResolvers<Response>();
      const states: unknown[] = [];
      const fetch = mock(() => response.promise);
      const load = compileExample(
        publishedCode("recipe", "api-request"),
        { fetch, setState: (state: unknown) => states.push(state) },
        "loadProfile",
      ) as (signal: AbortSignal) => Promise<void>;
      const controller = new AbortController();
      const pending = load(controller.signal);
      controller.abort();
      if (outcome === "success")
        response.resolve(Response.json({ name: "An" }));
      else response.reject(new Error("Offline"));
      await pending;

      expect(fetch).toHaveBeenCalledWith("https://api.example.com/profile", {
        signal: controller.signal,
      });
      expect(states).toEqual([{ status: "loading" }]);
    },
  );

  test("both locales teach local state before controlled text input", () => {
    for (const locale of ["en", "vi"] as const) {
      const roadmap = getRoadmap("react-native", "kotlin", locale)!;
      const slugs = getRoadmapLessonLocations(roadmap).map(
        ({ lesson }) => lesson.conceptSlug,
      );
      expect(slugs).toContain("local-state");
      expect(slugs).toContain("text-input");
      expect(slugs.indexOf("local-state")).toBeLessThan(
        slugs.indexOf("text-input"),
      );
    }
  });
});

describe("published token refresh example", () => {
  test("concurrent and late 401s share one refresh and retry with the renewed token", async () => {
    const started = Promise.withResolvers<void>();
    const renewed = Promise.withResolvers<string>();
    const late = Promise.withResolvers<Response>();
    const fetch = mock(async (url: string, options: RequestInit) => {
      const oldToken =
        new Headers(options.headers).get("Authorization") === "Bearer expired";
      if (oldToken && url.endsWith("/late")) return late.promise;
      return new Response(null, { status: oldToken ? 401 : 200 });
    });
    const refresh = mock(() => {
      started.resolve();
      return renewed.promise;
    });
    const signOut = mock(() => {});
    const get = createSession(fetch, refresh, signOut);
    const first = get("/one");
    const second = get("/two");
    const delayed = get("/late");
    await started.promise;
    expect(refresh).toHaveBeenCalledTimes(1);
    renewed.resolve("renewed");
    expect(
      (await Promise.all([first, second])).map((response) => response.status),
    ).toEqual([200, 200]);
    late.resolve(new Response(null, { status: 401 }));
    expect((await delayed).status).toBe(200);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(6);
    expect(signOut).not.toHaveBeenCalled();
  });

  test("a failed refresh signs out once and late 401s cannot restart it", async () => {
    const started = Promise.withResolvers<void>();
    const renewed = Promise.withResolvers<string>();
    const late = Promise.withResolvers<Response>();
    const fetch = mock(async (url: string) =>
      url.endsWith("/late")
        ? late.promise
        : new Response(null, { status: 401 }),
    );
    const refresh = mock(() => {
      started.resolve();
      return renewed.promise;
    });
    const signOut = mock(() => {});
    const get = createSession(fetch, refresh, signOut);
    const first = get("/one");
    const second = get("/two");
    const delayed = get("/late");
    await started.promise;
    renewed.reject(new Error("Refresh failed"));
    expect(
      (await Promise.all([first, second])).map((response) => response.status),
    ).toEqual([401, 401]);
    late.resolve(new Response(null, { status: 401 }));
    expect((await delayed).status).toBe(401);
    await expect(get("/after-sign-out")).rejects.toThrow("Signed out");
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test.each(["", "   ", "expired"])(
    "invalid refreshed token %j signs out without retry",
    async (token) => {
      const fetch = mock(async () => new Response(null, { status: 401 }));
      const signOut = mock(() => {});
      const get = createSession(fetch, async () => token, signOut);
      expect((await get("/profile")).status).toBe(401);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(signOut).toHaveBeenCalledTimes(1);
    },
  );

  test("a second 401 is returned without a refresh loop", async () => {
    const fetch = mock(async () => new Response(null, { status: 401 }));
    const refresh = mock(async () => "renewed");
    const get = createSession(fetch, refresh, () => {});
    expect((await get("/profile")).status).toBe(401);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  test.each([200, 500])(
    "HTTP %i does not refresh or sign out",
    async (status) => {
      const refresh = mock(async () => "renewed");
      const signOut = mock(() => {});
      const get = createSession(
        async () => new Response(null, { status }),
        refresh,
        signOut,
      );
      expect((await get("/profile")).status).toBe(status);
      expect(refresh).not.toHaveBeenCalled();
      expect(signOut).not.toHaveBeenCalled();
    },
  );
});
