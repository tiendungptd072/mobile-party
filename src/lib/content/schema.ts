import {
  CONTENT_REFERENCE_KINDS,
  CONCEPT_CATEGORIES,
  type Concept,
  type ConceptCategory,
  type ConceptImplementation,
  type ContentReference,
  type ContentReferenceKind,
  type ConceptRelationship,
  type Relationship,
} from "@/types/concept";
import type { Roadmap, RoadmapLesson, RoadmapSection } from "@/types/roadmap";
import type { Recipe, RecipeImplementation } from "@/types/recipe";
import {
  CODE_LANGUAGES,
  TECHNOLOGY_IDS,
  type CodeLanguage,
  type Technology,
  type TechnologyDefinition,
} from "@/types/technology";

const RELATIONSHIPS = ["equivalent", "similar", "different"] as const;
const KEBAB_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class ContentValidationError extends Error {
  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "ContentValidationError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new ContentValidationError(path, "expected an object");
  }

  return value;
}

function readString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ContentValidationError(path, "expected a non-empty string");
  }

  return value.trim();
}

function readKebabCase(value: unknown, path: string): string {
  const text = readString(value, path);

  if (!KEBAB_CASE_PATTERN.test(text)) {
    throw new ContentValidationError(path, "expected a kebab-case identifier");
  }

  return text;
}

function readPositiveNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new ContentValidationError(path, "expected a non-negative number");
  }

  return value;
}

function readStringArray(value: unknown, path: string): readonly string[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError(path, "expected an array");
  }

  const entries = value.map((entry, index) =>
    readString(entry, `${path}[${index}]`),
  );
  const normalizedEntries = new Set(
    entries.map((entry) => entry.toLocaleLowerCase()),
  );

  if (normalizedEntries.size !== entries.length) {
    throw new ContentValidationError(path, "contains duplicate values");
  }

  return entries;
}

function readLiteral<const Values extends readonly string[]>(
  value: unknown,
  values: Values,
  path: string,
): Values[number] {
  if (typeof value !== "string" || !values.includes(value)) {
    throw new ContentValidationError(
      path,
      `expected one of: ${values.join(", ")}`,
    );
  }

  return value;
}

function readTechnology(value: unknown, path: string): Technology {
  return readLiteral(value, TECHNOLOGY_IDS, path);
}

function readCodeLanguage(value: unknown, path: string): CodeLanguage {
  return readLiteral(value, CODE_LANGUAGES, path);
}

function readHttpsUrl(value: unknown, path: string): string {
  const text = readString(value, path);

  try {
    const url = new URL(text);

    if (url.protocol !== "https:") {
      throw new ContentValidationError(path, "expected an HTTPS URL");
    }
  } catch (error) {
    if (error instanceof ContentValidationError) throw error;
    throw new ContentValidationError(path, "expected a valid HTTPS URL");
  }

  return text;
}

function readIsoDate(value: unknown, path: string): string {
  const text = readString(value, path);
  const date = new Date(`${text}T00:00:00.000Z`);

  if (
    !ISO_DATE_PATTERN.test(text) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== text
  ) {
    throw new ContentValidationError(path, "expected an ISO date (YYYY-MM-DD)");
  }

  return text;
}

function validateReferences(
  value: unknown,
  path: string,
): readonly ContentReference[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentValidationError(path, "expected at least one reference");
  }

  const urls = new Set<string>();

  return value.map((entry, index) => {
    const referencePath = `${path}[${index}]`;
    const reference = readRecord(entry, referencePath);
    const url = readHttpsUrl(reference.url, `${referencePath}.url`);
    const normalizedUrl = url.toLocaleLowerCase();

    if (urls.has(normalizedUrl)) {
      throw new ContentValidationError(
        referencePath,
        "duplicate reference URL",
      );
    }

    urls.add(normalizedUrl);

    return {
      title: readString(reference.title, `${referencePath}.title`),
      url,
      kind: readLiteral(
        reference.kind,
        CONTENT_REFERENCE_KINDS,
        `${referencePath}.kind`,
      ) as ContentReferenceKind,
      verifiedAt: readIsoDate(
        reference.verifiedAt,
        `${referencePath}.verifiedAt`,
      ),
      ...(reference.technology === undefined
        ? {}
        : {
            technology: readTechnology(
              reference.technology,
              `${referencePath}.technology`,
            ),
          }),
      ...(reference.version === undefined
        ? {}
        : {
            version: readString(reference.version, `${referencePath}.version`),
          }),
    };
  });
}

function validateImplementation(
  value: unknown,
  path: string,
): ConceptImplementation {
  const implementation = readRecord(value, path);
  const code = implementation.code;
  const filename = implementation.filename;

  return {
    name: readString(implementation.name, `${path}.name`),
    summary: readString(implementation.summary, `${path}.summary`),
    language: readCodeLanguage(implementation.language, `${path}.language`),
    ...(code === undefined ? {} : { code: readString(code, `${path}.code`) }),
    ...(filename === undefined
      ? {}
      : { filename: readString(filename, `${path}.filename`) }),
  };
}

function validateImplementations(
  value: unknown,
  path: string,
): Partial<Record<Technology, ConceptImplementation>> {
  const rawImplementations = readRecord(value, path);
  const implementations: Partial<Record<Technology, ConceptImplementation>> =
    {};

  for (const [technologyValue, implementation] of Object.entries(
    rawImplementations,
  )) {
    const technology = readTechnology(
      technologyValue,
      `${path}.${technologyValue}`,
    );
    implementations[technology] = validateImplementation(
      implementation,
      `${path}.${technology}`,
    );
  }

  for (const requiredTechnology of ["react-native", "kotlin"] as const) {
    if (!implementations[requiredTechnology]) {
      throw new ContentValidationError(
        path,
        `missing required ${requiredTechnology} implementation`,
      );
    }
  }

  return implementations;
}

function validateRelationship(
  value: unknown,
  path: string,
): ConceptRelationship {
  const relationship = readRecord(value, path);
  const from = readTechnology(relationship.from, `${path}.from`);
  const to = readTechnology(relationship.to, `${path}.to`);

  if (from === to) {
    throw new ContentValidationError(path, "source and target must differ");
  }

  return {
    from,
    to,
    type: readLiteral(
      relationship.type,
      RELATIONSHIPS,
      `${path}.type`,
    ) as Relationship,
    explanation: readString(relationship.explanation, `${path}.explanation`),
  };
}

function validateRelationships(
  value: unknown,
  path: string,
  implementations: Concept["implementations"],
): readonly ConceptRelationship[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentValidationError(
      path,
      "expected at least one relationship",
    );
  }

  return value.map((entry, index) => {
    const relationship = validateRelationship(entry, `${path}[${index}]`);

    if (
      !implementations[relationship.from] ||
      !implementations[relationship.to]
    ) {
      throw new ContentValidationError(
        `${path}[${index}]`,
        "relationship references an implementation that is not present",
      );
    }

    return relationship;
  });
}

export function validateConcept(value: unknown, path = "concept"): Concept {
  const concept = readRecord(value, path);
  const id = readKebabCase(concept.id, `${path}.id`);
  const slug = readKebabCase(concept.slug, `${path}.slug`);

  if (id !== slug) {
    throw new ContentValidationError(path, "id and slug must match");
  }

  const implementations = validateImplementations(
    concept.implementations,
    `${path}.implementations`,
  );

  return {
    id,
    slug,
    title: readString(concept.title, `${path}.title`),
    description: readString(concept.description, `${path}.description`),
    category: readLiteral(
      concept.category,
      CONCEPT_CATEGORIES,
      `${path}.category`,
    ) as ConceptCategory,
    order: readPositiveNumber(concept.order, `${path}.order`),
    aliases: readStringArray(concept.aliases, `${path}.aliases`),
    keywords: readStringArray(concept.keywords, `${path}.keywords`),
    implementations,
    relationships: validateRelationships(
      concept.relationships,
      `${path}.relationships`,
      implementations,
    ),
    mentalModel: readString(concept.mentalModel, `${path}.mentalModel`),
    differences: readStringArray(concept.differences, `${path}.differences`),
    commonMistakes: readStringArray(
      concept.commonMistakes,
      `${path}.commonMistakes`,
    ),
    productionNotes: readStringArray(
      concept.productionNotes,
      `${path}.productionNotes`,
    ),
    references: validateReferences(concept.references, `${path}.references`),
  };
}

export function validateConcepts(value: unknown): readonly Concept[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError("concepts", "expected an array");
  }

  const concepts = value.map((entry, index) =>
    validateConcept(entry, `concepts[${index}]`),
  );
  const identifiers = new Set<string>();

  for (const concept of concepts) {
    for (const identifier of [concept.slug, ...concept.aliases]) {
      const normalizedIdentifier = identifier.toLocaleLowerCase();

      if (identifiers.has(normalizedIdentifier)) {
        throw new ContentValidationError(
          `concepts.${concept.slug}`,
          `duplicate slug or alias: ${identifier}`,
        );
      }

      identifiers.add(normalizedIdentifier);
    }
  }

  return [...concepts].sort(
    (left, right) =>
      left.order - right.order || left.slug.localeCompare(right.slug),
  );
}

export function validateTechnologies(
  value: unknown,
): readonly TechnologyDefinition[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError("technologies", "expected an array");
  }

  const technologies = value.map((entry, index) => {
    const path = `technologies[${index}]`;
    const technology = readRecord(entry, path);

    return {
      id: readTechnology(technology.id, `${path}.id`),
      name: readString(technology.name, `${path}.name`),
      shortName: readString(technology.shortName, `${path}.shortName`),
      language: readCodeLanguage(technology.language, `${path}.language`),
    };
  });

  if (
    technologies.length !== TECHNOLOGY_IDS.length ||
    technologies.some(
      (technology, index) => technology.id !== TECHNOLOGY_IDS[index],
    )
  ) {
    throw new ContentValidationError(
      "technologies",
      `expected canonical order: ${TECHNOLOGY_IDS.join(", ")}`,
    );
  }

  return technologies;
}

function validateRoadmapLesson(
  value: unknown,
  path: string,
  conceptSlugs: ReadonlySet<string>,
): RoadmapLesson {
  const lesson = readRecord(value, path);
  const conceptSlug = readKebabCase(lesson.conceptSlug, `${path}.conceptSlug`);

  if (!conceptSlugs.has(conceptSlug)) {
    throw new ContentValidationError(
      `${path}.conceptSlug`,
      `unknown concept: ${conceptSlug}`,
    );
  }

  return {
    conceptSlug,
    title: readString(lesson.title, `${path}.title`),
    order: readPositiveNumber(lesson.order, `${path}.order`),
    exercise: readString(lesson.exercise, `${path}.exercise`),
    checklist: readStringArray(lesson.checklist, `${path}.checklist`),
    stages: (() => {
      if (!Array.isArray(lesson.stages) || lesson.stages.length !== 3) {
        throw new ContentValidationError(
          `${path}.stages`,
          "expected three learning stages",
        );
      }

      const stageIds = ["basic", "applied", "production"] as const;

      return lesson.stages.map((stage, index) => {
        const record = readRecord(stage, `${path}.stages[${index}]`);
        const id = readLiteral(
          record.id,
          stageIds,
          `${path}.stages[${index}].id`,
        );

        if (id !== stageIds[index]) {
          throw new ContentValidationError(
            `${path}.stages[${index}].id`,
            "must follow basic, applied, production order",
          );
        }

        return {
          id,
          title: readString(record.title, `${path}.stages[${index}].title`),
          description: readString(
            record.description,
            `${path}.stages[${index}].description`,
          ),
          ...(record.examples === undefined
            ? {}
            : {
                examples: (() => {
                  const examples = validateImplementations(
                    record.examples,
                    `${path}.stages[${index}].examples`,
                  );

                  for (const [technology, example] of Object.entries(
                    examples,
                  )) {
                    if (!example.code) {
                      throw new ContentValidationError(
                        `${path}.stages[${index}].examples.${technology}.code`,
                        "expected stage examples to include code",
                      );
                    }
                  }

                  return examples;
                })(),
              }),
        };
      });
    })(),
  };
}

function validateRoadmapSection(
  value: unknown,
  path: string,
  conceptSlugs: ReadonlySet<string>,
): RoadmapSection {
  const section = readRecord(value, path);

  if (!Array.isArray(section.lessons) || section.lessons.length === 0) {
    throw new ContentValidationError(`${path}.lessons`, "expected an array");
  }

  return {
    id: readKebabCase(section.id, `${path}.id`),
    title: readString(section.title, `${path}.title`),
    order: readPositiveNumber(section.order, `${path}.order`),
    lessons: section.lessons
      .map((lesson, index) =>
        validateRoadmapLesson(
          lesson,
          `${path}.lessons[${index}]`,
          conceptSlugs,
        ),
      )
      .sort((left, right) => left.order - right.order),
  };
}

export function validateRoadmaps(
  value: unknown,
  conceptSlugs: ReadonlySet<string>,
): readonly Roadmap[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError("roadmaps", "expected an array");
  }

  const pairs = new Set<string>();

  return value.map((entry, index) => {
    const path = `roadmaps[${index}]`;
    const roadmap = readRecord(entry, path);
    const source = readTechnology(roadmap.source, `${path}.source`);
    const target = readTechnology(roadmap.target, `${path}.target`);

    if (source === target) {
      throw new ContentValidationError(path, "source and target must differ");
    }

    const pair = `${source}:${target}`;

    if (pairs.has(pair)) {
      throw new ContentValidationError(path, `duplicate roadmap pair: ${pair}`);
    }

    pairs.add(pair);

    if (!Array.isArray(roadmap.sections) || roadmap.sections.length === 0) {
      throw new ContentValidationError(`${path}.sections`, "expected an array");
    }

    return {
      source,
      target,
      sections: roadmap.sections
        .map((section, sectionIndex) =>
          validateRoadmapSection(
            section,
            `${path}.sections[${sectionIndex}]`,
            conceptSlugs,
          ),
        )
        .sort((left, right) => left.order - right.order),
    };
  });
}

function validateRecipeImplementation(
  value: unknown,
  path: string,
): RecipeImplementation {
  const implementation = readRecord(value, path);
  const filename = implementation.filename;

  return {
    summary: readString(implementation.summary, `${path}.summary`),
    language: readCodeLanguage(implementation.language, `${path}.language`),
    code: readString(implementation.code, `${path}.code`),
    ...(filename === undefined
      ? {}
      : { filename: readString(filename, `${path}.filename`) }),
  };
}

export function validateRecipe(value: unknown, path = "recipe"): Recipe {
  const recipe = readRecord(value, path);
  const rawImplementations = readRecord(
    recipe.implementations,
    `${path}.implementations`,
  );
  const implementations: Recipe["implementations"] = {};

  for (const [technologyValue, implementation] of Object.entries(
    rawImplementations,
  )) {
    const technology = readTechnology(
      technologyValue,
      `${path}.implementations.${technologyValue}`,
    );
    implementations[technology] = validateRecipeImplementation(
      implementation,
      `${path}.implementations.${technology}`,
    );
  }

  if (Object.keys(implementations).length === 0) {
    throw new ContentValidationError(
      `${path}.implementations`,
      "expected at least one implementation",
    );
  }

  return {
    slug: readKebabCase(recipe.slug, `${path}.slug`),
    title: readString(recipe.title, `${path}.title`),
    description: readString(recipe.description, `${path}.description`),
    category: readString(recipe.category, `${path}.category`),
    keywords: readStringArray(recipe.keywords, `${path}.keywords`),
    flow: readStringArray(recipe.flow, `${path}.flow`),
    implementations,
    architectureNotes: readStringArray(
      recipe.architectureNotes,
      `${path}.architectureNotes`,
    ),
  };
}

export function validateRecipes(value: unknown): readonly Recipe[] {
  if (!Array.isArray(value)) {
    throw new ContentValidationError("recipes", "expected an array");
  }

  const recipes = value.map((entry, index) =>
    validateRecipe(entry, `recipes[${index}]`),
  );
  const slugs = new Set<string>();

  for (const recipe of recipes) {
    if (slugs.has(recipe.slug)) {
      throw new ContentValidationError(
        `recipes.${recipe.slug}`,
        "duplicate recipe slug",
      );
    }

    slugs.add(recipe.slug);
  }

  return [...recipes].sort((left, right) =>
    left.slug.localeCompare(right.slug),
  );
}
