import type { ConceptImplementation } from "@/types/concept";
import type { Technology } from "@/types/technology";

export const LESSON_STAGE_IDS = ["basic", "applied", "production"] as const;

export type RoadmapLesson = {
  checklist: readonly string[];
  conceptSlug: string;
  exercise: string;
  order: number;
  stages: readonly LessonStage[];
  title: string;
};

export type LessonStage = {
  description: string;
  /** Explicit examples take precedence over convention files; missing sides remain absent. */
  examples?: Partial<Record<Technology, ConceptImplementation>>;
  id: (typeof LESSON_STAGE_IDS)[number];
  title: string;
};

export type RoadmapSection = {
  id: string;
  lessons: readonly RoadmapLesson[];
  order: number;
  title: string;
};

export type Roadmap = {
  sections: readonly RoadmapSection[];
  source: Technology;
  target: Technology;
};
