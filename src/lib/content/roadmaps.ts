import { rawRoadmaps } from "@content/roadmaps";
import { getConcepts } from "@/lib/content/concepts";
import { validateRoadmaps } from "@/lib/content/schema";
import type { Roadmap, RoadmapLesson, RoadmapSection } from "@/types/roadmap";
import type { Technology } from "@/types/technology";

const conceptSlugs = new Set(getConcepts().map((concept) => concept.slug));
const roadmaps = validateRoadmaps(rawRoadmaps, conceptSlugs);

export function getRoadmaps() {
  return roadmaps;
}

export function getRoadmap(source: Technology, target: Technology) {
  return roadmaps.find(
    (roadmap) => roadmap.source === source && roadmap.target === target,
  );
}

export type RoadmapLessonLocation = {
  lesson: RoadmapLesson;
  section: RoadmapSection;
};

export function getRoadmapLessonLocations(
  roadmap: Roadmap,
): readonly RoadmapLessonLocation[] {
  return roadmap.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ lesson, section })),
  );
}

export function getRoadmapLessonLocation(
  roadmap: Roadmap,
  slug: string,
): RoadmapLessonLocation | undefined {
  return getRoadmapLessonLocations(roadmap).find(
    ({ lesson }) => lesson.conceptSlug === slug,
  );
}
