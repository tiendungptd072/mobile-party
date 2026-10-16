import { describe, expect, test } from "bun:test";
import { renderToReadableStream } from "react-dom/server";
import {
  createFoundationSearchIndex,
  searchFoundationIndex,
} from "@/lib/search/foundation-index";
import {
  createFoundationCollection,
  getFoundationArticles,
} from "@/lib/content/foundations";
import { foundationDefinitions } from "@content/foundations";
import { getMessages } from "@/lib/i18n/messages";
import { getLocalizedPath } from "@/features/locale/use-locale-messages.client";
import { SITE_URL } from "@/lib/site";
import sitemap from "../../../app/sitemap";
import FoundationsPage from "../../../app/[locale]/foundations/page";
import { generateMetadata } from "../../../app/[locale]/foundations/[slug]/page";

const slug = "process-death-and-state-restoration";

async function html(element: React.ReactNode) {
  return new Response(await renderToReadableStream(element)).text();
}

describe("Foundations discovery", () => {
  test.each(["en", "vi"] as const)(
    "finds the published %s pilot by title, keywords, and API without shipping article bodies",
    (locale) => {
      const index = createFoundationSearchIndex(getFoundationArticles(locale));
      expect(index).toHaveLength(7);
      const pilot = index.find((entry) => entry.slug === slug)!;
      for (const term of [pilot.title, "SavedStateHandle", "process death"])
        expect(
          searchFoundationIndex(index, term).map((entry) => entry.slug),
        ).toEqual([slug]);
      expect(searchFoundationIndex(index, "  ")).toBe(index);
      expect(searchFoundationIndex(index, "unrelated-query")).toEqual([]);
      expect(
        searchFoundationIndex(index, "scenePhase").map((entry) => entry.slug),
      ).toEqual(["application-and-screen-lifecycle"]);
      expect(
        searchFoundationIndex(index, "AppInitializer").map(
          (entry) => entry.slug,
        ),
      ).toEqual(["startup-and-session-restoration"]);
      expect(
        searchFoundationIndex(index, "ValueNotifier").map(
          (entry) => entry.slug,
        ),
      ).toEqual(["state-ownership-and-data-flow"]);
      expect(
        searchFoundationIndex(index, "markNeedsPaint").map(
          (entry) => entry.slug,
        ),
      ).toEqual(["rendering-and-frame-scheduling"]);
      expect(
        searchFoundationIndex(index, "highPriorityGesture").map(
          (entry) => entry.slug,
        ),
      ).toEqual(["input-gestures-focus-and-keyboard"]);
      expect(Object.keys(index[0]).sort()).toEqual([
        "description",
        "keywords",
        "slug",
        "title",
        "topic",
      ]);
      expect(JSON.stringify(index)).not.toContain("foundation:");
    },
  );

  test("matches Vietnamese without diacritics and requires every query word", () => {
    const index = createFoundationSearchIndex(getFoundationArticles("vi"));
    expect(
      searchFoundationIndex(index, "  KHOI PHUC  ").map((entry) => entry.slug),
    ).toContain(slug);
    expect(
      searchFoundationIndex(index, "ban nhap").map((entry) => entry.slug),
    ).toEqual([slug, "startup-and-session-restoration"]);
    expect(searchFoundationIndex(index, "process unrelated-query")).toEqual([]);
  });

  test("drafts cannot enter public search, even when passed directly to the projection", () => {
    const pilot = foundationDefinitions[0];
    const draft = {
      ...pilot,
      metadata: {
        ...pilot.metadata,
        slug: "hidden-draft",
        status: "draft" as const,
      },
    };
    const collection = createFoundationCollection([pilot, draft]);
    expect(
      createFoundationSearchIndex(collection.getArticles("en")).map(
        (entry) => entry.slug,
      ),
    ).toEqual([slug]);
    const article = getFoundationArticles("en")[0];
    expect(
      createFoundationSearchIndex([{ ...article, metadata: draft.metadata }]),
    ).toEqual([]);
  });

  test.each(["en", "vi"] as const)(
    "prerenders %s search/topic links and matching sitemap metadata",
    async (locale) => {
      const page = await html(
        await FoundationsPage({ params: Promise.resolve({ locale }) }),
      );
      const messages = getMessages(locale).foundations;
      expect(page).toContain(messages.search);
      expect(page).toContain('type="search"');
      expect(page).toContain('id="topic-runtime-lifecycle"');
      expect(page).toContain(`href="/${locale}/foundations/${slug}"`);
      expect(page).not.toContain("pipeline-fixture");
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale, slug }),
      });
      const entry = sitemap().find(
        (entry) => entry.url === `${SITE_URL}/${locale}/foundations/${slug}`,
      )!;
      expect(entry).toBeDefined();
      expect(entry.url).toBe(`${SITE_URL}${metadata.alternates!.canonical}`);
      expect(entry.alternates!.languages).toEqual({
        en: `${SITE_URL}/en/foundations/${slug}`,
        vi: `${SITE_URL}/vi/foundations/${slug}`,
      });
      expect(
        sitemap().some(
          (entry) => entry.url === `${SITE_URL}/${locale}/foundations`,
        ),
      ).toBe(true);
      expect(
        sitemap().some((entry) =>
          /pipeline-fixture|hidden-draft/.test(entry.url),
        ),
      ).toBe(false);
      expect(
        getLocalizedPath(
          `/${locale}/foundations/${slug}`,
          locale === "en" ? "vi" : "en",
        ),
      ).toBe(`/${locale === "en" ? "vi" : "en"}/foundations/${slug}`);
      for (const path of [
        "/dictionary/null-safety",
        "/recipes/api-request",
        "/compare/state-restoration",
        "/learn/react-native/kotlin/state-restoration",
      ])
        expect(
          sitemap().some(
            (entry) => entry.url === `${SITE_URL}/${locale}${path}`,
          ),
        ).toBe(true);
    },
  );
});
