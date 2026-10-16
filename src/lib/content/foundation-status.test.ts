import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { foundationDefinitions } from "@content/foundations";
import { getConcepts } from "@/lib/content/concepts";
import {
  formatFoundationStatus,
  getFoundationLinkRoutes,
  getFoundationStatus,
  getMarkupAnchors,
  readBuiltPageAnchors,
} from "@/lib/content/foundation-status";
import type { FoundationDefinition } from "@/types/foundation";
import { createElement } from "react";
import { renderToReadableStream } from "react-dom/server";
import { FoundationReader } from "@/components/foundations/foundation-reader";

const concepts = new Set(getConcepts().map((entry) => entry.slug));
const routes = getFoundationLinkRoutes();
const pilot = foundationDefinitions[0];
function fixture(): FoundationDefinition {
  return {
    metadata: { ...structuredClone(pilot.metadata), status: "draft" },
    bodies: {
      en: {
        ...pilot.bodies.en!,
        foundation: structuredClone(pilot.bodies.en!.foundation),
      },
      vi: {
        ...pilot.bodies.vi!,
        foundation: structuredClone(pilot.bodies.vi!.foundation),
      },
    },
  };
}
function audit(
  entry: FoundationDefinition,
  pageAnchors?: (path: string) => ReadonlySet<string> | undefined,
) {
  return getFoundationStatus([entry], {
    conceptSlugs: concepts,
    routes,
    ...(pageAnchors ? { pageAnchors } : {}),
  });
}

describe("Foundations quality report", () => {
  test("reports the real bilingual draft as structurally ready, without publishing it", () => {
    const report = audit(fixture());
    expect(report.issues).toEqual([]);
    expect(report.articles[0].status).toBe("draft");
    expect(report.articles[0].publicationReady).toBe(true);
    expect(report.articles[0].locales.en).toEqual({
      metadata: true,
      body: true,
      reviewed: true,
      state: "ready",
    });
    expect(formatFoundationStatus(report)).toContain(
      "published: 0; drafts: 1; structurally ready: 1; nonempty bodies: 2/2; errors: 0; pending: 0.",
    );
    expect(formatFoundationStatus(report)).toContain(
      "do not verify technical claims",
    );
  });

  test("incomplete drafts are pending, but the same missing publication inputs are errors when published", () => {
    const entry = fixture();
    delete entry.bodies.vi;
    delete entry.metadata.locales.vi;
    const draft = audit(entry);
    expect(draft.issues.every((issue) => issue.severity === "pending")).toBe(
      true,
    );
    expect(draft.articles[0].locales.en.state).toBe("ready");
    expect(draft.articles[0].locales.vi).toEqual({
      metadata: false,
      body: false,
      reviewed: false,
      state: "incomplete",
    });
    expect(draft.articles[0].publicationReady).toBe(false);
    entry.metadata.status = "published";
    expect(
      audit(entry).issues.some(
        (issue) => issue.locale === "vi" && issue.severity === "error",
      ),
    ).toBe(true);
  });

  test.each([
    [
      "missing figure",
      (entry: FoundationDefinition) => {
        entry.bodies.en!.foundation.figures[0].src = `/illustrations/foundations/${entry.metadata.slug}/missing.svg`;
      },
      "illustration file is missing",
    ],
    [
      "unresolved citation",
      (entry: FoundationDefinition) => {
        entry.bodies.en!.foundation = {
          ...entry.bodies.en!.foundation,
          citations: ["unknown-source"],
        };
      },
      "unknown citation source",
    ],
    [
      "unknown related concept",
      (entry: FoundationDefinition) => {
        entry.metadata.relatedConcepts = ["not-a-concept"];
      },
      "unknown related concept",
    ],
    [
      "unknown related article",
      (entry: FoundationDefinition) => {
        entry.metadata.relatedArticles = ["not-an-article"];
      },
      "unknown or self-related article",
    ],
    [
      "self-related article",
      (entry: FoundationDefinition) => {
        entry.metadata.relatedArticles = [entry.metadata.slug];
      },
      "unknown or self-related article",
    ],
    [
      "missing review date",
      (entry: FoundationDefinition) => {
        delete entry.metadata.locales.vi!.reviewedAt;
      },
      "editorial review date",
    ],
  ] as const)(
    "detects %s in an isolated invalid fixture",
    (_name, mutate, message) => {
      const entry = fixture();
      mutate(entry);
      const report = audit(entry);
      expect(
        report.issues.some((issue) => issue.message.includes(message)),
      ).toBe(true);
      expect(report.articles[0].publicationReady).toBe(false);
      expect(audit(fixture()).issues).toEqual([]);
    },
  );

  test("detects duplicate slugs and paired-locale figure mismatches", () => {
    expect(
      getFoundationStatus([fixture(), fixture()], {
        conceptSlugs: concepts,
        routes,
      }).issues.some((issue) =>
        issue.message.includes("duplicate article slug"),
      ),
    ).toBe(true);
    const entry = fixture();
    entry.bodies.vi!.foundation.figures[0].id = "different-figure";
    expect(audit(entry).issues).toContainEqual(
      expect.objectContaining({
        kind: "publication",
        severity: "pending",
        message: "locale figure IDs differ",
      }),
    );
    entry.metadata.status = "published";
    expect(audit(entry).issues).toContainEqual(
      expect.objectContaining({
        kind: "publication",
        severity: "error",
        message: "locale figure IDs differ",
      }),
    );
  });

  test.each([
    ["/en/compare/not-a-concept", "link"],
    ["/vi/compare/state-restoration", "link"],
    ["/vi/compare/state-restoration#references-title", "link"],
    ["/en/foundations/not-an-article", "link"],
    ["/illustrations/missing.svg", "asset"],
    ["javascript:alert(1)", "link"],
    ["/en/compare/state-restoration#%zz", "link"],
  ])("rejects invalid destination %s", (href, kind) => {
    const entry = fixture();
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: [href],
    };
    expect(audit(entry).issues).toContainEqual(
      expect.objectContaining({
        slug: entry.metadata.slug,
        locale: "en",
        severity: "error",
        kind,
      }),
    );
  });

  test("checks local, encoded, and renderer-owned anchors; ignores external availability", () => {
    const entry = fixture();
    const heading = entry.bodies.en!.foundation.headings[0].id;
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: [
        `#${heading}`,
        `#%73${heading.slice(1)}`,
        "#",
        "#references-title",
        "#related-concepts-title",
        "#main-content",
        "/en/compare/state-restoration?source=react-native&target=kotlin",
        "../compare/local-storage",
        "https://example.invalid/unavailable#unknown",
        "mailto:reader@example.com",
      ],
    };
    expect(audit(entry).issues).toEqual([]);
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: ["#related-articles-title"],
    };
    expect(
      audit(entry).issues.some((issue) => issue.severity === "error"),
    ).toBe(true);
  });

  test("verifies cross-page fragments against provided build anchors, distinguishing absent build evidence", () => {
    const entry = fixture();
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: ["/en/compare/state-restoration#comparison-title"],
    };
    expect(audit(entry).issues[0].kind).toBe("build");
    expect(audit(entry, () => new Set(["comparison-title"])).issues).toEqual(
      [],
    );
    expect(audit(entry, () => new Set(["other-title"])).issues).toContainEqual(
      expect.objectContaining({
        kind: "link",
        message:
          "unknown target fragment: /en/compare/state-restoration#comparison-title",
      }),
    );
  });

  test("audits another Foundation's real headings and rejects public links to a draft", () => {
    const source = fixture();
    const target = fixture();
    source.metadata.slug = "source-fixture";
    source.metadata.references = [];
    const destination = `/en/foundations/${target.metadata.slug}#${target.bodies.en!.foundation.headings[0].id}`;
    // A small synthetic body isolates cross-article checks from figure ownership.
    source.bodies = {
      en: {
        default: () => createElement("p", null, "Synthetic source"),
        foundation: {
          headings: [],
          citations: [],
          figures: [],
          snippets: [],
          hasContent: true,
          links: [destination],
        },
      },
    };
    source.metadata.relatedArticles = [target.metadata.slug];
    const check = () =>
      getFoundationStatus([source, target], {
        conceptSlugs: concepts,
        routes,
      }).issues.filter((issue) => issue.kind === "link");
    expect(check()).toContainEqual(
      expect.objectContaining({
        severity: "pending",
        message: "article target is unpublished: " + destination,
      }),
    );
    source.metadata.status = "published";
    expect(check()).toContainEqual(
      expect.objectContaining({
        severity: "error",
        message: "article target is unpublished: " + destination,
      }),
    );
    target.metadata.status = "published";
    expect(check()).toEqual([]);
    source.metadata.slug = " source-fixture ";
    source.metadata.relatedArticles = [` ${target.metadata.slug} `];
    source.bodies.en!.foundation = {
      ...source.bodies.en!.foundation,
      links: ["#related-articles-title"],
    };
    expect(check()).toEqual([]);
    expect(
      getFoundationStatus([source, target], {
        conceptSlugs: concepts,
        routes,
      }).issues.filter((issue) => issue.kind === "schema"),
    ).toEqual([]);
    source.bodies.en!.foundation = {
      ...source.bodies.en!.foundation,
      links: [destination + "-missing"],
    };
    expect(check()).toContainEqual(
      expect.objectContaining({
        severity: "error",
        message: "unknown target fragment: " + destination + "-missing",
      }),
    );
  });

  test("checks every published article's rendered anchors even without authored self-links", async () => {
    const entry = fixture();
    entry.metadata.status = "published";
    expect(
      audit(entry, () => undefined).issues.some(
        (issue) => issue.kind === "build",
      ),
    ).toBe(true);
    const pages = new Map<string, ReadonlySet<string>>();
    for (const locale of ["en", "vi"] as const) {
      const article = {
        metadata: entry.metadata,
        body: entry.bodies[locale]!,
        locale,
        localized: entry.metadata.locales[locale]!,
      };
      const html = await new Response(
        await renderToReadableStream(
          createElement(
            "main",
            { id: "main-content" },
            createElement(FoundationReader, {
              article,
              relatedArticles: [],
              relatedConcepts: getConcepts(locale).filter((concept) =>
                entry.metadata.relatedConcepts.includes(concept.slug),
              ),
            }),
          ),
        ),
      ).text();
      pages.set(
        `/${locale}/foundations/${entry.metadata.slug}`,
        getMarkupAnchors(html),
      );
    }
    const anchors = (path: string) => pages.get(path);
    expect(audit(entry, anchors).issues).toEqual([]);
    const missing = entry.bodies.en!.foundation.headings[0].id;
    expect(
      audit(
        entry,
        (path) =>
          new Set([...(anchors(path) ?? [])].filter((id) => id !== missing)),
      ).issues,
    ).toContainEqual(
      expect.objectContaining({
        kind: "link",
        message: `rendered article is missing anchor: /en/foundations/${entry.metadata.slug}#${missing}`,
      }),
    );
  });

  test("strict CLI preserves concept/stage coverage and includes the published pilot report", () => {
    const result = Bun.spawnSync([
      process.execPath,
      "scripts/content-status.ts",
      "--strict",
    ]);
    expect(result.exitCode).toBe(0);
    const output = new TextDecoder().decode(result.stdout);
    expect(output).toContain("Required cells: 864; ready: 864; missing: 0.");
    expect(output).toContain(
      "Foundation registry: 7 articles; published: 7; drafts: 0;",
    );
    expect(output).toContain("errors: 0; pending: 0.");
  });

  test("checks SVG link fragments as local assets", () => {
    const entry = fixture();
    const src = entry.bodies.en!.foundation.figures[0].src;
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: [src + "#title"],
    };
    expect(audit(entry).issues).toEqual([]);
    entry.bodies.en!.foundation = {
      ...entry.bodies.en!.foundation,
      links: [src + "#missing-shape"],
    };
    expect(audit(entry).issues).toContainEqual(
      expect.objectContaining({
        kind: "link",
        message: "unknown target fragment: " + src + "#missing-shape",
      }),
    );
  });

  test("derives valid Learn/Compare/Dictionary/Recipes routes from existing content", () => {
    for (const locale of ["en", "vi"]) {
      expect(routes.has(`/${locale}/compare/state-restoration`)).toBe(true);
      expect(routes.has(`/${locale}/dictionary/state-restoration`)).toBe(true);
      expect(routes.has(`/${locale}/recipes/api-request`)).toBe(true);
      expect(routes.has(`/${locale}/learn/react-native/flutter`)).toBe(true);
      expect(
        routes.has(`/${locale}/learn/react-native/kotlin/state-restoration`),
      ).toBe(true);
      expect(routes.has(`/${locale}/learn/react-native/react-native`)).toBe(
        false,
      );
    }
  });

  test("reads generated HTML IDs with containment and missing-build handling", () => {
    expect(
      getMarkupAnchors(
        '<h2 id="real">Title</h2><div data-id="not-an-id"></div><pre>id=&quot;example&quot;</pre><p id=\'second\'>Text</p>',
      ),
    ).toEqual(new Set(["real", "second"]));
    const root = mkdtempSync(join(tmpdir(), "mobile-party-foundation-build-"));
    try {
      mkdirSync(join(root, "en"));
      writeFileSync(
        join(root, "en/page.html"),
        '<h2 id="built-title">Title</h2>',
      );
      expect(readBuiltPageAnchors("/en/page", root)).toEqual(
        new Set(["built-title"]),
      );
      expect(readBuiltPageAnchors("/en/missing", root)).toBeUndefined();
      expect(readBuiltPageAnchors("/../escape", root)).toBeUndefined();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
