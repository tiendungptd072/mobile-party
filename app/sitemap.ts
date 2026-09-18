import type { MetadataRoute } from "next";
import { getConcepts } from "@/lib/content/concepts";
import { getRoadmapLessonLocations, getRoadmaps } from "@/lib/content/roadmaps";
import { getRecipes } from "@/lib/content/recipes";
import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/bookmarks",
    "/compare",
    "/dictionary",
    "/recipes",
  ];
  const lessons = getRoadmaps().flatMap((roadmap) =>
    getRoadmapLessonLocations(roadmap).map(
      ({ lesson }) =>
        `/learn/${roadmap.source}/${roadmap.target}/${lesson.conceptSlug}`,
    ),
  );
  const routes = [
    ...staticRoutes,
    ...getConcepts().flatMap((concept) => [
      `/compare/${concept.slug}`,
      `/dictionary/${concept.slug}`,
    ]),
    ...getRecipes().map((recipe) => `/recipes/${recipe.slug}`),
    ...lessons,
  ];

  return LOCALES.flatMap((locale) =>
    routes.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((candidate) => [
            candidate,
            `${SITE_URL}/${candidate}${path}`,
          ]),
        ),
      },
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
