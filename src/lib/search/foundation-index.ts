import type { FoundationArticle, FoundationTopic } from "@/types/foundation";

export type FoundationSearchEntry = {
  slug: string;
  topic: FoundationTopic;
  title: string;
  description: string;
  keywords: readonly string[];
};

/** Projects public articles to metadata only; MDX and references stay on the server. */
export function createFoundationSearchIndex(
  articles: readonly FoundationArticle[],
): readonly FoundationSearchEntry[] {
  return articles
    .filter((article) => article.metadata.status === "published")
    .toSorted(
      (a, b) =>
        a.metadata.order - b.metadata.order ||
        a.metadata.slug.localeCompare(b.metadata.slug),
    )
    .map(({ metadata, localized }) => ({
      slug: metadata.slug,
      topic: metadata.topic,
      title: localized.title,
      description: localized.description,
      keywords: localized.keywords,
    }));
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .trim();
}

/** Matches every query word, including Vietnamese typed without diacritics. */
export function searchFoundationIndex(
  index: readonly FoundationSearchEntry[],
  query: string,
): readonly FoundationSearchEntry[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return index;
  return index.filter((entry) => {
    const text = normalize(
      [entry.title, entry.slug, entry.description, ...entry.keywords].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
