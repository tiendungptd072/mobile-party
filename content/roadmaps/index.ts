import { reactNativeToKotlinRoadmap } from "@content/roadmaps/react-native-to-kotlin";
import { progressiveStageExamples } from "@content/roadmaps/react-native-to-kotlin-stage-examples";

const reactNativeToKotlinRoadmapWithExamples = {
  ...reactNativeToKotlinRoadmap,
  sections: reactNativeToKotlinRoadmap.sections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => {
      const lessonExamples =
        progressiveStageExamples[
          lesson.conceptSlug as keyof typeof progressiveStageExamples
        ];

      return {
        ...lesson,
        stages: lesson.stages.map((stage) => ({
          ...stage,
          ...("examples" in stage
            ? {}
            : {
                examples:
                  lessonExamples?.[stage.id as keyof typeof lessonExamples],
              }),
        })),
      };
    }),
  })),
};

export const rawRoadmaps = [reactNativeToKotlinRoadmapWithExamples] as const;
