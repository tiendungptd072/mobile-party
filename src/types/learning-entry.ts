export const LEARNING_LEVELS = ["junior", "middle", "senior"] as const;
export type LearningLevel = (typeof LEARNING_LEVELS)[number];

export const ENTRY_QUESTION_IDS = [
  "kotlin",
  "compose",
  "async",
  "architecture",
] as const;
export type EntryQuestionId = (typeof ENTRY_QUESTION_IDS)[number];

export type LearningEntryGuide = {
  title: string;
  introduction: string;
  answerYes: string;
  answerNo: string;
  incomplete: string;
  recommendation: string;
  viewPath: string;
  pathsTitle: string;
  lessonsLabel: string;
  prerequisiteLabel: string;
  milestoneLabel: string;
  rubricLabel: string;
  availabilityTitle: string;
  futureContentNote: string;
  modulesTitle: string;
  moduleCheckLabel: string;
  skipGuidance: string;
  questions: readonly {
    id: EntryQuestionId;
    title: string;
    proof: string;
  }[];
  paths: readonly {
    level: LearningLevel;
    title: string;
    audience: string;
    prerequisite: string;
    lessonSlugs: readonly string[];
    milestone: string;
    rubric: readonly string[];
  }[];
  modules: readonly {
    sectionId: string;
    prerequisite: string;
    check: string;
    lessonSlug: string;
  }[];
};
