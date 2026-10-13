import {
  ContentValidationError,
  readLiteral,
  readRecord,
  readString,
  readTechnology,
} from "@/lib/content/validation";
import {
  CODE_LANGUAGES,
  TECHNOLOGY_IDS,
  type TechnologyDefinition,
} from "@/types/technology";

/** Validates the small technology catalog without importing server-only content loaders. */
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
      language: readLiteral(
        technology.language,
        CODE_LANGUAGES,
        `${path}.language`,
      ),
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
