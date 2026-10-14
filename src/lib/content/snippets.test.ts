import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { rawConcepts } from "@content/concepts";
import { rawRecipes } from "@content/recipes";
import { getConcepts } from "@/lib/content/concepts";
import { getRoadmap } from "@/lib/content/roadmaps";
import {
  ContentValidationError,
  validateConcept,
  validateRecipe,
  validateRoadmaps,
} from "@/lib/content/schema";
import { extractSnippetCode, loadSnippet } from "@/lib/content/snippets";

describe("snippet display regions", () => {
  test("hides imports, package declarations, support code, and markers", () => {
    const source = [
      "package snippets.fixture.basic",
      "import example.Support",
      "// #region show",
      "fun shown() {",
      "    render()",
      "}",
      "// #endregion",
      "fun support() = Unit",
    ].join("\r\n");
    expect(extractSnippetCode(source, "fixture.kt")).toBe(
      "fun shown() {\n    render()\n}",
    );
  });

  test("shows the full file when no display region is present", () => {
    expect(extractSnippetCode("const value = 1;\n", "fixture.tsx")).toBe(
      "const value = 1;",
    );
  });

  test.each([
    "// #region show\ncode",
    "code\n// #endregion",
    "// #endregion\n// #region show",
    "// #region show\ncode\n// #region show\n// #endregion",
  ])("rejects malformed or ambiguous regions: %j", (source) => {
    expect(() => extractSnippetCode(source, "fixture.kt")).toThrow(
      /expected one complete display region/,
    );
  });

  test("rejects an empty display region", () => {
    expect(() =>
      extractSnippetCode("// #region show\n// #endregion", "fixture.kt"),
    ).toThrow(/snippet has no display code/);
  });
});

describe("snippet resolution", () => {
  const source = {
    kind: "concept",
    slug: "local-state",
    stage: "basic",
  } as const;

  test("loads concept and recipe code using the naming convention", () => {
    expect(loadSnippet(source, "react-native", "tsx")).toContain(
      "function Counter()",
    );
    const kotlin = loadSnippet(source, "kotlin", "kotlin");
    expect(kotlin).toContain("@Composable");
    expect(kotlin).not.toContain("package snippets.");
    expect(kotlin).not.toContain("#region");
    expect(
      loadSnippet(
        { kind: "recipe", slug: "refresh-token" },
        "react-native",
        "tsx",
      ),
    ).toContain("function createAuthenticatedGet(");
  });

  test("preserves a distinct Learn basic example through an explicit path", () => {
    const compare = loadSnippet(source, "react-native", "tsx");
    const lesson = loadSnippet(
      source,
      "react-native",
      "tsx",
      "local-state/react-native/learn-basic.tsx",
    );
    expect(lesson).not.toBe(compare);
    expect(lesson).toContain("setCount(count + 1)");
  });

  test("reports a missing file as ContentValidationError with its path", () => {
    const load = () =>
      loadSnippet(
        { ...source, slug: "missing-snippet-fixture" },
        "react-native",
        "tsx",
      );
    expect(load).toThrow(ContentValidationError);
    expect(load).toThrow(
      /content\/snippets\/missing-snippet-fixture\/react-native\/basic.tsx/,
    );
  });

  test.each(["../outside.tsx", "../../outside.tsx"])(
    "rejects escaping paths: %s",
    (path) => {
      expect(() => loadSnippet(source, "react-native", "tsx", path)).toThrow(
        /snippet path must stay inside content\/snippets/,
      );
    },
  );

  test("gives every Kotlin file a unique package and hides it from display", () => {
    const packages = new Set<string>();
    const files = [...new Bun.Glob("**/*.kt").scanSync("content/snippets")];
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const contents = readFileSync(join("content/snippets", file), "utf8");
      const packageName = contents.match(
        /^package (snippets\.[a-z_]+(?:\.[a-z_]+)+)$/m,
      )?.[1];
      expect(packageName).toBeDefined();
      expect(packages.has(packageName!)).toBe(false);
      packages.add(packageName!);
      expect(extractSnippetCode(contents, file)).not.toContain(
        "package snippets.",
      );
    }
  });
});

describe("file-backed content validation", () => {
  test.each(["tsx", "typescript", "kotlin"] as const)(
    "rejects inline %s concept code",
    (language) => {
      const technology = language === "kotlin" ? "kotlin" : "react-native";
      expect(() =>
        validateConcept({
          ...rawConcepts[0],
          implementations: {
            ...rawConcepts[0].implementations,
            [technology]: {
              ...rawConcepts[0].implementations[technology],
              language,
              code: "inline",
            },
          },
        }),
      ).toThrow(/inline code is not allowed; use a snippet file/);
    },
  );

  test.each(["tsx", "typescript", "kotlin"] as const)(
    "rejects inline %s recipe code",
    (language) => {
      const technology = language === "kotlin" ? "kotlin" : "react-native";
      expect(() =>
        validateRecipe({
          ...rawRecipes[0],
          implementations: {
            ...rawRecipes[0].implementations,
            [technology]: {
              ...rawRecipes[0].implementations[technology],
              language,
              code: "inline",
            },
          },
        }),
      ).toThrow(/inline code is not allowed; use a snippet file/);
    },
  );

  test("rejects inline stage code as well", () => {
    const roadmap = getRoadmap("react-native", "kotlin")!;
    const section = roadmap.sections[0];
    const lesson = section.lessons[0];
    const invalid = {
      ...roadmap,
      sections: [
        {
          ...section,
          lessons: [
            {
              ...lesson,
              stages: lesson.stages.map((stage) => ({
                ...stage,
                examples: {
                  ...stage.examples,
                  "react-native": {
                    ...stage.examples?.["react-native"],
                    code: "inline",
                  },
                },
              })),
            },
          ],
        },
      ],
    };
    expect(() => validateRoadmaps([invalid], getConcepts())).toThrow(
      /inline code is not allowed; use a snippet file/,
    );
  });

  test("reserves the recipes slug for recipe snippet paths", () => {
    expect(() =>
      validateConcept({ ...rawConcepts[0], id: "recipes", slug: "recipes" }),
    ).toThrow(/recipes is a reserved slug/);
  });
});
