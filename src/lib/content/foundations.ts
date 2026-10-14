import "server-only";
import { foundationDefinitions } from "@content/foundations";
import { rawConcepts } from "@content/concepts";
import type { Locale } from "@/lib/i18n/locale";
import type {
  FoundationArticle,
  FoundationDefinition,
} from "@/types/foundation";
import { validateFoundationDefinitions } from "@/lib/content/foundation-schema";

/** Public projections exclude drafts, including lookup and related-article discovery. */
export function createFoundationCollection(
  definitions: readonly FoundationDefinition[],
) {
  function getArticles(locale: Locale): readonly FoundationArticle[] {
    return definitions.flatMap(({ metadata, bodies }) => {
      const localized = metadata.locales[locale];
      const body = bodies[locale];
      return metadata.status === "published" && localized && body
        ? [{ metadata, locale, localized, body }]
        : [];
    });
  }
  function getArticle(
    slug: string,
    locale: Locale,
  ): FoundationArticle | undefined {
    return getArticles(locale).find(
      (article) => article.metadata.slug === slug,
    );
  }
  function getRelatedArticles(
    article: FoundationArticle,
  ): readonly FoundationArticle[] {
    const related = new Set(article.metadata.relatedArticles);
    return getArticles(article.locale).filter((entry) =>
      related.has(entry.metadata.slug),
    );
  }
  return { getArticles, getArticle, getRelatedArticles };
}

const collection = createFoundationCollection(
  validateFoundationDefinitions(
    foundationDefinitions,
    new Set(rawConcepts.map((concept) => concept.slug)),
  ),
);

export const getFoundationArticles = collection.getArticles;
export const getFoundationArticle = collection.getArticle;
export const getRelatedFoundationArticles = collection.getRelatedArticles;
