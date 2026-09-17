import {
  createTechnologyPair,
  type TechnologyPair,
} from "@/lib/technology-pair";

export const TECHNOLOGY_PAIR_STORAGE_KEY = "mobile-guide:technology-pair";

export type KeyValueStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function readStoredTechnologyPair(
  storage: KeyValueStorage,
): TechnologyPair | undefined {
  try {
    const storedValue = storage.getItem(TECHNOLOGY_PAIR_STORAGE_KEY);

    if (!storedValue) {
      return undefined;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (
      typeof parsedValue !== "object" ||
      parsedValue === null ||
      !("source" in parsedValue) ||
      !("target" in parsedValue) ||
      typeof parsedValue.source !== "string" ||
      typeof parsedValue.target !== "string"
    ) {
      return undefined;
    }

    return createTechnologyPair(parsedValue.source, parsedValue.target);
  } catch {
    return undefined;
  }
}

export function writeStoredTechnologyPair(
  storage: KeyValueStorage,
  pair: TechnologyPair,
): boolean {
  try {
    storage.setItem(TECHNOLOGY_PAIR_STORAGE_KEY, JSON.stringify(pair));
    return true;
  } catch {
    return false;
  }
}
