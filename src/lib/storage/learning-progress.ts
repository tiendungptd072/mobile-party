import {
  serializeTechnologyPair,
  type TechnologyPair,
} from "@/lib/technology-pair";
import type { KeyValueStorage } from "@/lib/storage/technology-pair";

export const LEARNING_PROGRESS_STORAGE_KEY = "mobile-guide:progress";

type StoredProgress = Record<string, readonly string[]>;

function readProgress(storage: KeyValueStorage): StoredProgress {
  try {
    const value = storage.getItem(LEARNING_PROGRESS_STORAGE_KEY);

    if (!value) {
      return {};
    }

    const parsedValue: unknown = JSON.parse(value);

    if (typeof parsedValue !== "object" || parsedValue === null) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsedValue).flatMap(([pair, lessons]) =>
        Array.isArray(lessons) &&
        lessons.every((lesson) => typeof lesson === "string")
          ? [[pair, [...new Set(lessons)]]]
          : [],
      ),
    );
  } catch {
    return {};
  }
}

export function readCompletedLessons(
  storage: KeyValueStorage,
  pair: TechnologyPair,
): readonly string[] {
  return readProgress(storage)[serializeTechnologyPair(pair)] ?? [];
}

export function writeCompletedLessons(
  storage: KeyValueStorage,
  pair: TechnologyPair,
  lessons: readonly string[],
): boolean {
  try {
    const progress = readProgress(storage);
    const pairKey = serializeTechnologyPair(pair);
    storage.setItem(
      LEARNING_PROGRESS_STORAGE_KEY,
      JSON.stringify({ ...progress, [pairKey]: [...new Set(lessons)] }),
    );
    return true;
  } catch {
    return false;
  }
}
