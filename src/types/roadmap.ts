import type { Technology } from "@/types/technology";

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
  id: "basic" | "applied" | "production";
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
