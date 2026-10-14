import type { FoundationArticleMetadata } from "@/types/foundation";
import { viFixtureMetadata } from "./vi/metadata";

// Synthetic review data is restricted to tests and never registered for publication.
export const fixtureMetadata: FoundationArticleMetadata = {
  slug: "pipeline-fixture",
  topic: "runtime-lifecycle",
  order: 0,
  status: "published",
  platforms: ["android", "ios"],
  locales: {
    en: {
      title: "MDX pipeline fixture",
      description: "Synthetic pipeline data, not educational content.",
      keywords: ["fixture", "state"],
      reviewedAt: "2000-01-01",
    },
    vi: viFixtureMetadata,
  },
  references: [
    {
      id: "fixture-source",
      kind: "official-docs",
      title: "Synthetic test source",
      url: "https://example.com/fixture",
      verifiedAt: "2000-01-01",
      technology: "kotlin",
    },
  ],
  relatedArticles: [],
  relatedConcepts: ["state-restoration"],
};
