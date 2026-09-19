import { reactNativeToKotlinRoadmap } from "@content/roadmaps/react-native-to-kotlin";
import { kotlinBridgeStageExamples } from "@content/roadmaps/react-native-to-kotlin-bridge-stage-examples";
import { progressiveStageExamples } from "@content/roadmaps/react-native-to-kotlin-stage-examples";
import { composeRuntimeStageExamples } from "@content/roadmaps/react-native-to-kotlin-runtime-stage-examples";
import { layoutStageExamples } from "@content/roadmaps/react-native-to-kotlin-layout-stage-examples";
import { insetStageExamples } from "@content/roadmaps/react-native-to-kotlin-insets-stage-examples";
import { adaptiveStageExamples } from "@content/roadmaps/react-native-to-kotlin-adaptive-stage-examples";
import { accessibilityStageExamples } from "@content/roadmaps/react-native-to-kotlin-accessibility-stage-examples";
import { animationStageExamples } from "@content/roadmaps/react-native-to-kotlin-animation-stage-examples";
import { gestureStageExamples } from "@content/roadmaps/react-native-to-kotlin-gesture-stage-examples";
import { permissionStageExamples } from "@content/roadmaps/react-native-to-kotlin-permissions-stage-examples";
import { backNavigationStageExamples } from "@content/roadmaps/react-native-to-kotlin-back-stage-examples";
import { uiTestingStageExamples } from "@content/roadmaps/react-native-to-kotlin-ui-testing-stage-examples";

const stageExamples = {
  ...kotlinBridgeStageExamples,
  ...composeRuntimeStageExamples,
  ...layoutStageExamples,
  ...insetStageExamples,
  ...adaptiveStageExamples,
  ...accessibilityStageExamples,
  ...animationStageExamples,
  ...gestureStageExamples,
  ...permissionStageExamples,
  ...backNavigationStageExamples,
  ...uiTestingStageExamples,
  ...progressiveStageExamples,
};

const reactNativeToKotlinRoadmapWithExamples = {
  ...reactNativeToKotlinRoadmap,
  sections: reactNativeToKotlinRoadmap.sections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => {
      const lessonExamples =
        stageExamples[lesson.conceptSlug as keyof typeof stageExamples];

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
