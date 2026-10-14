import { describe, expect, test } from "bun:test";
import { getConceptBySlug, getConcepts } from "@/lib/content/concepts";
import { getRoadmaps } from "@/lib/content/roadmaps";
import { validateRoadmaps } from "@/lib/content/schema";
import { loadOptionalSnippet, loadSnippet } from "@/lib/content/snippets";
import { formatContentStatus, getContentStatus } from "@/lib/content/status";
import { LESSON_STAGE_IDS } from "@/types/roadmap";
import type { Concept } from "@/types/concept";

function roadmap(
  slug: string,
  examples?: unknown,
  source = "react-native",
  target = "kotlin",
) {
  return [
    {
      source,
      target,
      sections: [
        {
          id: "fixture",
          title: "Fixture",
          order: 0,
          lessons: [
            {
              conceptSlug: slug,
              title: "Fixture",
              order: 0,
              exercise: "Practice",
              checklist: ["Compare"],
              stages: LESSON_STAGE_IDS.map((id) => ({
                id,
                title: id,
                description: `${id} description`,
                ...(examples === undefined ? {} : { examples }),
              })),
            },
          ],
        },
      ],
    },
  ];
}

describe("stage snippet conventions", () => {
  const component = getConceptBySlug("component")!;
  const missing: Concept = {
    ...component,
    id: "stage-missing-fixture",
    slug: "stage-missing-fixture",
  };

  test("loads all three stages without stage example metadata", () => {
    const [resolved] = validateRoadmaps(roadmap(component.slug), [component]);
    for (const stage of resolved.sections[0].lessons[0].stages) {
      for (const technology of ["react-native", "kotlin"] as const) {
        expect(stage.examples?.[technology]?.code).toBe(
          loadSnippet(
            { kind: "concept", slug: component.slug, stage: stage.id },
            technology,
            technology === "kotlin" ? "kotlin" : "tsx",
          ),
        );
        expect(stage.examples?.[technology]?.summary).toBe(stage.description);
      }
    }
  });

  test("keeps explicit Learn code and discovers the other side", () => {
    const explicit = {
      "react-native": {
        name: "Learn",
        summary: "Learn code",
        language: "tsx",
        snippet: "component/react-native/learn-basic.tsx",
      },
    };
    const [resolved] = validateRoadmaps(roadmap(component.slug, explicit), [
      component,
    ]);
    const basic = resolved.sections[0].lessons[0].stages[0];
    expect(basic.examples?.["react-native"]?.code).toContain(
      "function Greeting()",
    );
    expect(basic.examples?.["react-native"]?.code).not.toBe(
      component.implementations["react-native"]?.code,
    );
    expect(basic.examples?.kotlin?.code).toContain(
      "fun Greeting(name: String)",
    );
  });

  test("inherits non-default languages such as shell snippets", () => {
    const concept = getConceptBySlug("android-build-variants")!;
    const [resolved] = validateRoadmaps(roadmap(concept.slug), [concept]);
    for (const stage of resolved.sections[0].lessons[0].stages) {
      expect(stage.examples?.kotlin?.language).toBe("bash");
      expect(stage.examples?.kotlin?.code).toBe(
        loadSnippet(
          { kind: "concept", slug: concept.slug, stage: stage.id },
          "kotlin",
          "bash",
        ),
      );
    }
  });

  test("leaves absent convention files missing without copying basic code", () => {
    const [resolved] = validateRoadmaps(roadmap(missing.slug), [missing]);
    expect(
      resolved.sections[0].lessons[0].stages.every((stage) => !stage.examples),
    ).toBe(true);
    expect(
      loadOptionalSnippet(
        { kind: "concept", slug: missing.slug, stage: "applied" },
        "react-native",
        "tsx",
      ),
    ).toBeUndefined();
  });

  test("supports a single explicit side even if the other side is missing", () => {
    const [resolved] = validateRoadmaps(
      roadmap(missing.slug, {
        "react-native": {
          name: "Available",
          summary: "Available code",
          language: "tsx",
          snippet: "component/react-native/basic.tsx",
        },
      }),
      [missing],
    );
    expect(
      resolved.sections[0].lessons[0].stages[0].examples?.["react-native"]
        ?.code,
    ).toContain("Greeting");
    expect(
      resolved.sections[0].lessons[0].stages[0].examples?.kotlin,
    ).toBeUndefined();
  });

  test("a broken explicit reference fails rather than silently falling back", () => {
    expect(() =>
      validateRoadmaps(
        roadmap(component.slug, {
          "react-native": {
            name: "Broken",
            summary: "Broken reference",
            language: "tsx",
            snippet: "missing-explicit.tsx",
          },
        }),
        [component],
      ),
    ).toThrow(/snippet file is missing/);
    expect(() =>
      validateRoadmaps(roadmap(component.slug, null), [component]),
    ).toThrow(/expected an object/);
  });

  test("discovers only the selected pair and leaves unsupported sides absent", () => {
    const [resolved] = validateRoadmaps(
      roadmap(component.slug, undefined, "flutter", "swiftui"),
      [component],
    );
    expect(
      resolved.sections[0].lessons[0].stages.every((stage) => !stage.examples),
    ).toBe(true);
  });
});

describe("stage content coverage", () => {
  test("reports all current required cells for both locales", () => {
    const cells = (["en", "vi"] as const).flatMap((locale) =>
      getContentStatus(getRoadmaps(locale), locale),
    );
    expect(cells).toHaveLength(getConcepts().length * 2 * 3 * 2);
    expect(cells.every((cell) => cell.code && cell.translated)).toBe(true);
    expect(formatContentStatus(cells)).toContain(
      `Required cells: ${cells.length}; ready: ${cells.length}; missing: 0.`,
    );
    expect(formatContentStatus(cells).split("\n")).toHaveLength(
      cells.length / 2 + 2,
    );
  });

  test("reports missing code and translations separately without counting English fallback", () => {
    const concept = {
      ...getConceptBySlug("component")!,
      slug: "untranslated-stage-fixture",
    };
    const resolved = validateRoadmaps(roadmap(concept.slug), [concept]);
    const english = getContentStatus(resolved, "en");
    const vietnamese = getContentStatus(resolved, "vi");
    expect(english.every((cell) => !cell.code && cell.translated)).toBe(true);
    expect(vietnamese.every((cell) => !cell.code && !cell.translated)).toBe(
      true,
    );
    const report = formatContentStatus([...english, ...vietnamese]);
    expect(report).toContain("missing-code\tmissing-code,missing-translation");
    expect(report).toContain("Required cells: 12; ready: 0; missing: 12.");
  });

  test("deduplicates reversed roadmaps without hiding a missing occurrence", () => {
    const roadmaps = getRoadmaps();
    const original = roadmaps[0];
    const reversed = {
      ...original,
      source: original.target,
      target: original.source,
      sections: original.sections.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) => ({
          ...lesson,
          stages: lesson.stages.map((stage) => ({
            ...stage,
            examples: undefined,
          })),
        })),
      })),
    };
    const cells = getContentStatus([...roadmaps, reversed], "en");
    expect(cells).toHaveLength(getContentStatus(roadmaps, "en").length);
    expect(cells.every((cell) => !cell.code)).toBe(true);
  });
});
