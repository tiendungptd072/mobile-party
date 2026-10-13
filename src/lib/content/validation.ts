import { TECHNOLOGY_IDS, type Technology } from "@/types/technology";

export class ContentValidationError extends Error {
  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "ContentValidationError";
  }
}

export function readRecord(
  value: unknown,
  path: string,
): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ContentValidationError(path, "expected an object");
  }
  return value as Record<string, unknown>;
}

export function readString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ContentValidationError(path, "expected a non-empty string");
  }
  return value.trim();
}

export function readLiteral<const Values extends readonly string[]>(
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

export function readTechnology(value: unknown, path: string): Technology {
  return readLiteral(value, TECHNOLOGY_IDS, path);
}
