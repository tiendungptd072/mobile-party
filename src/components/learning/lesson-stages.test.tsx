import { describe, expect, test } from "bun:test";
import { renderToReadableStream } from "react-dom/server";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { LessonStages } from "@/components/learning/lesson-stages";
import { getRoadmapLessonLocation, getRoadmap } from "@/lib/content/roadmaps";
import { getTechnologyById } from "@/lib/content/technologies";
import { getMessages } from "@/lib/i18n/messages";
import type { LessonStage } from "@/types/roadmap";

async function render(stages: readonly LessonStage[], locale: "en" | "vi") {
  const messages = getMessages(locale);
  const stream = await renderToReadableStream(
    <PathnameContext.Provider
      value={`/${locale}/learn/react-native/kotlin/component`}
    >
      <LessonStages
        missingCode={messages.learn.stageCodeMissing}
        stageLabel={messages.learn.stage}
        sourceTechnology={getTechnologyById("react-native")!}
        targetTechnology={getTechnologyById("kotlin")!}
        stages={stages}
      />
    </PathnameContext.Provider>,
  );
  return new Response(stream).text();
}

describe("lesson stage rendering", () => {
  test.each(["en", "vi"] as const)(
    "shows an explicit state for both absent sides in %s",
    async (locale) => {
      const html = await render(
        [{ id: "applied", title: "Applied", description: "Practice" }],
        locale,
      );
      expect(
        html.split(getMessages(locale).learn.stageCodeMissing),
      ).toHaveLength(3);
      expect(html).toContain("React Native");
      expect(html).toContain("Kotlin + Jetpack Compose");
    },
  );

  test("keeps available code visible when only one side exists", async () => {
    const html = await render(
      [
        {
          id: "basic",
          title: "Basic",
          description: "Practice",
          examples: {
            "react-native": {
              name: "Example",
              summary: "Available",
              language: "tsx",
              code: "const availableExample = 1;",
            },
          },
        },
      ],
      "en",
    );
    expect(html).toContain("availableExample");
    expect(html.split(getMessages("en").learn.stageCodeMissing)).toHaveLength(
      2,
    );
  });

  test.each(["en", "vi"] as const)(
    "renders existing code comparisons for all three stages in %s",
    async (locale) => {
      const stages = getRoadmapLessonLocation(
        getRoadmap("react-native", "kotlin", locale)!,
        "component",
      )!.lesson.stages;
      const html = await render(stages, locale);
      for (const stage of stages) expect(html).toContain(stage.title);
      expect(html).toContain("Greeting");
      expect(html).toContain("ProfileCard");
      expect(html).toContain("ProfileRoute");
      expect(html).toContain(getMessages(locale).code.sideBySide);
      expect(html).not.toContain(getMessages(locale).learn.stageCodeMissing);
    },
  );
});
