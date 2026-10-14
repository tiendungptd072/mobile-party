import {
  viConceptTranslations,
  viRoadmapTranslations,
} from "@content/locales/vi";
import { LOCALES, type Locale } from "@/lib/i18n/locale";
import {
  LESSON_STAGE_IDS,
  type LessonStage,
  type Roadmap,
} from "@/types/roadmap";
import { TECHNOLOGY_IDS, type Technology } from "@/types/technology";

export type ContentStatusCell = {
  conceptSlug: string;
  technology: Technology;
  stage: LessonStage["id"];
  locale: Locale;
  code: boolean;
  translated: boolean;
};

/** Audits required stage examples in published roadmap pairs; English fallback is not a translation. */
export function getContentStatus(
  roadmaps: readonly Roadmap[],
  locale: Locale,
): readonly ContentStatusCell[] {
  const translations: Readonly<Record<string, { stages: readonly string[] }>> =
    viRoadmapTranslations.lessons;
  const cells = new Map<string, ContentStatusCell>();
  for (const roadmap of roadmaps) {
    for (const section of roadmap.sections) {
      for (const lesson of section.lessons) {
        for (const stage of lesson.stages) {
          const translated =
            locale === "en" ||
            (Object.hasOwn(viConceptTranslations, lesson.conceptSlug) &&
              Boolean(
                translations[lesson.conceptSlug]?.stages[
                  LESSON_STAGE_IDS.indexOf(stage.id)
                ]?.trim(),
              ) &&
              Boolean(
                viRoadmapTranslations.stageTitles[
                  LESSON_STAGE_IDS.indexOf(stage.id)
                ]?.trim(),
              ));
          for (const technology of [roadmap.source, roadmap.target]) {
            const key = `${lesson.conceptSlug}:${technology}:${stage.id}`;
            const previous = cells.get(key);
            cells.set(key, {
              conceptSlug: lesson.conceptSlug,
              technology,
              stage: stage.id,
              locale,
              code:
                Boolean(stage.examples?.[technology]?.code) &&
                (previous?.code ?? true),
              translated: translated && (previous?.translated ?? true),
            });
          }
        }
      }
    }
  }
  return [...cells.values()];
}

export function formatContentStatus(
  cells: readonly ContentStatusCell[],
): string {
  const rows = new Map<
    string,
    { cell: ContentStatusCell; locales: Map<Locale, string> }
  >();
  for (const cell of cells) {
    const key = `${cell.conceptSlug}\t${cell.technology}\t${cell.stage}`;
    const row = rows.get(key) ?? { cell, locales: new Map<Locale, string>() };
    const missing = [
      !cell.code && "missing-code",
      !cell.translated && "missing-translation",
    ].filter(Boolean);
    row.locales.set(cell.locale, missing.join(",") || "ready");
    rows.set(key, row);
  }
  const missing = cells.filter((cell) => !cell.code || !cell.translated).length;
  return [
    ["concept", "technology", "stage", ...LOCALES].join("\t"),
    ...[...rows.values()]
      .sort(
        ({ cell: left }, { cell: right }) =>
          left.conceptSlug.localeCompare(right.conceptSlug) ||
          TECHNOLOGY_IDS.indexOf(left.technology) -
            TECHNOLOGY_IDS.indexOf(right.technology) ||
          LESSON_STAGE_IDS.indexOf(left.stage) -
            LESSON_STAGE_IDS.indexOf(right.stage),
      )
      .map(({ cell, locales }) =>
        [
          cell.conceptSlug,
          cell.technology,
          cell.stage,
          ...LOCALES.map((locale) => locales.get(locale) ?? "missing-locale"),
        ].join("\t"),
      ),
    `Required cells: ${cells.length}; ready: ${cells.length - missing}; missing: ${missing}.`,
  ].join("\n");
}
