import {
  viConceptTranslations,
  viRecipeTranslations,
  viRoadmapTranslations,
} from "@content/locales/vi";
import type { Concept } from "@/types/concept";
import type { Recipe } from "@/types/recipe";
import type { Roadmap } from "@/types/roadmap";
import type { Locale } from "@/lib/i18n/locale";

export function localizeConcept(concept: Concept, locale: Locale): Concept {
  if (locale === "en") return concept;

  const slug = concept.slug as keyof typeof viConceptTranslations;
  const translation = viConceptTranslations[slug];

  if (!translation) return concept;

  const implementations = Object.fromEntries(
    Object.entries(concept.implementations).map(
      ([technology, implementation]) => {
        const translated =
          translation.implementations[
            technology as keyof typeof translation.implementations
          ];

        return [
          technology,
          implementation && translated
            ? { ...implementation, ...translated }
            : implementation,
        ];
      },
    ),
  ) as Concept["implementations"];

  return {
    ...concept,
    title: translation.title,
    description: translation.description,
    implementations,
    relationships: concept.relationships.map((relationship) => ({
      ...relationship,
      explanation: translation.relationship,
    })),
    mentalModel: translation.mentalModel,
    differences: translation.differences,
    commonMistakes: translation.commonMistakes,
    productionNotes: translation.productionNotes,
  };
}

export function localizeRecipe(recipe: Recipe, locale: Locale): Recipe {
  if (locale === "en") return recipe;

  const slug = recipe.slug as keyof typeof viRecipeTranslations;
  const translation = viRecipeTranslations[slug];

  if (!translation) return recipe;

  const implementations = Object.fromEntries(
    Object.entries(recipe.implementations).map(
      ([technology, implementation]) => [
        technology,
        implementation
          ? {
              ...implementation,
              summary:
                translation.implementationSummaries[
                  technology as keyof typeof translation.implementationSummaries
                ] ?? implementation.summary,
            }
          : implementation,
      ],
    ),
  ) as Recipe["implementations"];

  return {
    ...recipe,
    title: translation.title,
    description: translation.description,
    category: translation.category,
    flow: translation.flow,
    implementations,
    architectureNotes: translation.architectureNotes,
  };
}

export function localizeRoadmap(roadmap: Roadmap, locale: Locale): Roadmap {
  if (locale === "en") return roadmap;

  return {
    ...roadmap,
    sections: roadmap.sections.map((section) => ({
      ...section,
      title:
        viRoadmapTranslations.sections[
          section.id as keyof typeof viRoadmapTranslations.sections
        ] ?? section.title,
      lessons: section.lessons.map((lesson) => {
        const translation =
          viRoadmapTranslations.lessons[
            lesson.conceptSlug as keyof typeof viRoadmapTranslations.lessons
          ];

        if (!translation) return lesson;

        return {
          ...lesson,
          title: translation.title,
          exercise: translation.exercise,
          checklist: translation.checklist,
          stages: lesson.stages.map((stage, index) => ({
            ...stage,
            title: viRoadmapTranslations.stageTitles[index] ?? stage.title,
            description: translation.stages[index] ?? stage.description,
            ...(stage.examples
              ? {
                  examples: Object.fromEntries(
                    Object.entries(stage.examples).map(
                      ([technology, example]) => [
                        technology,
                        example && {
                          ...example,
                          name: `Ví dụ ${viRoadmapTranslations.stageTitles[index] ?? stage.title}`,
                          summary:
                            translation.stages[index] ?? stage.description,
                        },
                      ],
                    ),
                  ),
                }
              : {}),
          })),
        };
      }),
    })),
  };
}
