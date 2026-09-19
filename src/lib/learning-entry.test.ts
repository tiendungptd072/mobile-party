import { describe, expect, test } from "bun:test";
import { getReactNativeToKotlinEntryGuide } from "@/lib/content/learning-entry";
import { getRoadmap, getRoadmapLessonLocation } from "@/lib/content/roadmaps";
import { getRecommendedLearningLevel } from "@/lib/learning-entry";
import { ENTRY_QUESTION_IDS, LEARNING_LEVELS } from "@/types/learning-entry";

describe("React Native to Android entry guide", () => {
  test("recommends the first capability gap after all answers are provided", () => {
    expect(getRecommendedLearningLevel({})).toBeNull();
    expect(
      getRecommendedLearningLevel({
        kotlin: false,
        compose: true,
        async: true,
        architecture: true,
      }),
    ).toBe("junior");
    expect(
      getRecommendedLearningLevel({
        kotlin: true,
        compose: true,
        async: false,
        architecture: true,
      }),
    ).toBe("middle");
    expect(
      getRecommendedLearningLevel({
        kotlin: true,
        compose: true,
        async: true,
        architecture: false,
      }),
    ).toBe("middle");
    expect(
      getRecommendedLearningLevel({
        kotlin: true,
        compose: true,
        async: true,
        architecture: true,
      }),
    ).toBe("senior");
  });

  test("keeps both locales equivalent and links only to published lessons", () => {
    const english = getReactNativeToKotlinEntryGuide("en");
    const vietnamese = getReactNativeToKotlinEntryGuide("vi");
    const roadmap = getRoadmap("react-native", "kotlin", "en")!;

    expect(english.questions.map(({ id }) => id)).toEqual([
      ...ENTRY_QUESTION_IDS,
    ]);
    expect(vietnamese.questions.map(({ id }) => id)).toEqual([
      ...ENTRY_QUESTION_IDS,
    ]);
    expect(english.paths.map(({ level }) => level)).toEqual([
      ...LEARNING_LEVELS,
    ]);
    expect(vietnamese.paths.map(({ level }) => level)).toEqual([
      ...LEARNING_LEVELS,
    ]);
    expect(vietnamese.introduction).not.toBe(english.introduction);

    english.paths.forEach((path, index) => {
      const translated = vietnamese.paths[index];
      expect(translated.lessonSlugs).toEqual(path.lessonSlugs);
      expect(translated.rubric).toHaveLength(path.rubric.length);
      expect(translated.milestone).not.toBe(path.milestone);
      for (const slug of path.lessonSlugs) {
        expect(getRoadmapLessonLocation(roadmap, slug)).toBeDefined();
      }
    });
    expect(english.modules.map(({ sectionId }) => sectionId).sort()).toEqual(
      roadmap.sections.map(({ id }) => id).sort(),
    );
    expect(
      english.modules.findIndex(({ sectionId }) => sectionId === "lifecycle"),
    ).toBeLessThan(
      english.modules.findIndex(({ sectionId }) => sectionId === "forms"),
    );
    english.modules.forEach((module, index) => {
      const translated = vietnamese.modules[index];
      expect(translated.sectionId).toBe(module.sectionId);
      expect(translated.lessonSlug).toBe(module.lessonSlug);
      expect(translated.check).not.toBe(module.check);
      expect(
        getRoadmapLessonLocation(roadmap, module.lessonSlug)?.section.id,
      ).toBe(module.sectionId);
    });
  });
});
