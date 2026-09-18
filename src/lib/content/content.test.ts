import { describe, expect, test } from "bun:test";
import { rawConcepts } from "@content/concepts";
import {
  findConceptByTerm,
  getConceptBySlug,
  getConcepts,
} from "@/lib/content/concepts";
import {
  getRoadmap,
  getRoadmapLessonLocation,
  getRoadmapLessonLocations,
} from "@/lib/content/roadmaps";
import {
  ContentValidationError,
  validateConcept,
  validateConcepts,
  validateRecipe,
  validateRoadmaps,
} from "@/lib/content/schema";
import { getTechnologies } from "@/lib/content/technologies";
import { getRecipeBySlug, getRecipes } from "@/lib/content/recipes";

describe("technology content", () => {
  test("uses the canonical technology order", () => {
    expect(getTechnologies().map((technology) => technology.id)).toEqual([
      "react-native",
      "flutter",
      "kotlin",
      "swiftui",
    ]);
  });
});

describe("concept content", () => {
  test("localizes educational prose without changing technical identifiers", () => {
    const english = getConceptBySlug("local-state", "en");
    const vietnamese = getConceptBySlug("local-state", "vi");

    expect(vietnamese?.title).toBe("State cục bộ");
    expect(vietnamese?.slug).toBe(english?.slug);
    expect(vietnamese?.implementations.kotlin?.code).toBe(
      english?.implementations.kotlin?.code,
    );
  });

  test("loads concepts in stable order", () => {
    const concepts = getConcepts();

    expect(concepts).toHaveLength(30);
    expect(concepts.map((concept) => concept.slug)).toEqual([
      "component",
      "props",
      "children",
      "conditional-ui",
      "local-state",
      "derived-state",
      "global-state",
      "layout",
      "vertical-layout",
      "horizontal-layout",
      "stack",
      "list",
      "grid",
      "pagination",
      "button",
      "text-input",
      "form",
      "side-effects",
      "lifecycle",
      "async",
      "loading-state",
      "error-handling",
      "navigation",
      "route-parameters",
      "deep-link",
      "api-request",
      "local-storage",
      "secure-storage",
      "authentication",
      "theme",
    ]);
  });

  test("resolves API aliases without changing canonical slugs", () => {
    expect(findConceptByTerm("FlatList")?.slug).toBe("list");
    expect(findConceptByTerm("MUTABLESTATEOF")?.slug).toBe("local-state");
  });

  test("sorts raw concepts by order", () => {
    const concepts = validateConcepts([rawConcepts[4], rawConcepts[0]]);

    expect(concepts.map((concept) => concept.slug)).toEqual([
      "component",
      "local-state",
    ]);
  });

  test("rejects duplicate slugs and aliases", () => {
    expect(() => validateConcepts([...rawConcepts, rawConcepts[0]])).toThrow(
      ContentValidationError,
    );
  });

  test("requires React Native and Kotlin implementations", () => {
    const invalidConcept = {
      ...rawConcepts[0],
      implementations: {
        kotlin: rawConcepts[0].implementations.kotlin,
      },
    };

    expect(() => validateConcept(invalidConcept)).toThrow(
      /missing required react-native implementation/,
    );
  });
});

describe("roadmap content", () => {
  test("covers every React Native to Kotlin concept exactly once", () => {
    const roadmap = getRoadmap("react-native", "kotlin");
    const lessonSlugs = getRoadmapLessonLocations(roadmap!).map(
      ({ lesson }) => lesson.conceptSlug,
    );

    expect(new Set(lessonSlugs).size).toBe(lessonSlugs.length);
    expect([...lessonSlugs].sort()).toEqual(
      getConcepts()
        .map((concept) => concept.slug)
        .sort(),
    );
  });

  test("provides progressive code comparisons for expanded lessons", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    for (const slug of [
      "local-state",
      "derived-state",
      "global-state",
      "text-input",
      "button",
      "form",
      "side-effects",
      "lifecycle",
    ]) {
      const lesson = getRoadmapLessonLocation(roadmap!, slug)?.lesson;

      expect(lesson?.stages).toHaveLength(3);
      expect(
        lesson?.stages.every(
          (stage) =>
            stage.examples?.["react-native"]?.code &&
            stage.examples.kotlin?.code,
        ),
      ).toBe(true);
    }
  });

  test("localizes roadmap lessons with equivalent structure", () => {
    const english = getRoadmap("react-native", "kotlin", "en");
    const vietnamese = getRoadmap("react-native", "kotlin", "vi");

    expect(vietnamese?.sections[0].title).toBe("UI cơ bản");
    expect(getRoadmapLessonLocations(vietnamese!)).toHaveLength(
      getRoadmapLessonLocations(english!).length,
    );
    const englishLocalState = getRoadmapLessonLocation(
      english!,
      "local-state",
    )?.lesson;
    const vietnameseLocalState = getRoadmapLessonLocation(
      vietnamese!,
      "local-state",
    )?.lesson;

    expect(englishLocalState?.stages.every((stage) => stage.examples)).toBe(
      true,
    );
    expect(vietnameseLocalState?.stages[0].examples?.kotlin?.code).toBe(
      englishLocalState?.stages[0].examples?.kotlin?.code,
    );
  });

  test("loads a roadmap using canonical concept references", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    expect(roadmap?.sections).toHaveLength(8);
    expect(roadmap?.sections[0].lessons[0].conceptSlug).toBe("component");
  });

  test("provides ordered lesson locations for navigation", () => {
    const roadmap = getRoadmap("react-native", "kotlin");

    expect(roadmap).toBeDefined();
    expect(
      getRoadmapLessonLocations(roadmap!).map(
        ({ lesson }) => lesson.conceptSlug,
      ),
    ).toEqual([
      "component",
      "props",
      "children",
      "conditional-ui",
      "layout",
      "vertical-layout",
      "horizontal-layout",
      "stack",
      "list",
      "grid",
      "text-input",
      "local-state",
      "derived-state",
      "global-state",
      "button",
      "form",
      "side-effects",
      "lifecycle",
      "navigation",
      "route-parameters",
      "deep-link",
      "async",
      "loading-state",
      "error-handling",
      "api-request",
      "pagination",
      "local-storage",
      "secure-storage",
      "authentication",
      "theme",
    ]);
    expect(getRoadmapLessonLocation(roadmap!, "local-state")?.section.id).toBe(
      "state",
    );
  });

  test("rejects unknown concept references", () => {
    const invalidRoadmap = {
      source: "react-native",
      target: "kotlin",
      sections: [
        {
          id: "fundamentals",
          title: "Fundamentals",
          order: 10,
          lessons: [
            {
              conceptSlug: "missing-concept",
              title: "Missing",
              order: 10,
              exercise: "Practice the missing concept.",
              checklist: ["Can identify the missing concept."],
              stages: [
                {
                  id: "basic",
                  title: "Basic",
                  description: "Understand the smallest example.",
                },
                {
                  id: "applied",
                  title: "Applied",
                  description: "Use it in an interaction.",
                },
                {
                  id: "production",
                  title: "Production",
                  description: "Apply it in a maintained feature.",
                },
              ],
            },
          ],
        },
      ],
    };

    expect(() =>
      validateRoadmaps([invalidRoadmap], new Set(["component"])),
    ).toThrow(/unknown concept: missing-concept/);
  });
});

describe("recipe content", () => {
  test("localizes recipe prose while preserving code", () => {
    const english = getRecipeBySlug("api-request", "en");
    const vietnamese = getRecipeBySlug("api-request", "vi");

    expect(vietnamese?.title).toBe("Gọi API");
    expect(vietnamese?.implementations["react-native"]?.code).toBe(
      english?.implementations["react-native"]?.code,
    );
  });

  test("loads the MVP implementation recipes", () => {
    expect(getRecipes()).toHaveLength(6);
    expect(getRecipeBySlug("deep-links")?.implementations.kotlin).toBeDefined();
  });

  test("requires at least one framework implementation", () => {
    expect(() =>
      validateRecipe({
        slug: "api-request",
        title: "API Request",
        description: "Make an HTTP request.",
        category: "networking",
        keywords: ["HTTP"],
        flow: ["Request", "Response"],
        implementations: {},
        architectureNotes: ["Keep transport details behind a repository."],
      }),
    ).toThrow(/expected at least one implementation/);
  });
});
