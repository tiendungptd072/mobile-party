import { describe, expect, test } from "bun:test";
import {
  changeSourceTechnology,
  changeTargetTechnology,
  createTechnologyPair,
  getLearnUrl,
  replaceTechnologyPairInPathname,
} from "@/lib/technology-pair";
import {
  readStoredTechnologyPair,
  TECHNOLOGY_PAIR_STORAGE_KEY,
  writeStoredTechnologyPair,
  type KeyValueStorage,
} from "@/lib/storage/technology-pair";
import {
  readCompletedLessons,
  writeCompletedLessons,
} from "@/lib/storage/learning-progress";
import { readBookmarks, writeBookmarks } from "@/lib/storage/bookmarks";

class MemoryStorage implements KeyValueStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

describe("technology pair", () => {
  test("rejects unknown or identical technologies", () => {
    expect(
      createTechnologyPair("react-native", "react-native"),
    ).toBeUndefined();
    expect(createTechnologyPair("web", "kotlin")).toBeUndefined();
  });

  test("swaps sides when selecting the opposite technology", () => {
    const pair = { source: "react-native", target: "kotlin" } as const;

    expect(changeSourceTechnology(pair, "kotlin")).toEqual({
      source: "kotlin",
      target: "react-native",
    });
    expect(changeTargetTechnology(pair, "react-native")).toEqual({
      source: "kotlin",
      target: "react-native",
    });
  });

  test("creates canonical learn URLs", () => {
    const pair = { source: "react-native", target: "kotlin" } as const;

    expect(getLearnUrl(pair)).toBe("/learn/react-native/kotlin");
    expect(getLearnUrl(pair, "local-state")).toBe(
      "/learn/react-native/kotlin/local-state",
    );
  });

  test("preserves the current concept when switching a pair route", () => {
    expect(
      replaceTechnologyPairInPathname(
        "/learn/react-native/kotlin/local-state",
        {
          source: "flutter",
          target: "swiftui",
        },
      ),
    ).toBe("/learn/flutter/swiftui/local-state");
    expect(
      replaceTechnologyPairInPathname("/recipes/api-request", {
        source: "flutter",
        target: "swiftui",
      }),
    ).toBe("/recipes/api-request");
  });
});

describe("technology pair storage", () => {
  test("round trips a valid pair", () => {
    const storage = new MemoryStorage();
    const pair = { source: "react-native", target: "kotlin" } as const;

    expect(writeStoredTechnologyPair(storage, pair)).toBe(true);
    expect(readStoredTechnologyPair(storage)).toEqual(pair);
  });

  test("ignores malformed and identical stored pairs", () => {
    const storage = new MemoryStorage();

    storage.setItem(TECHNOLOGY_PAIR_STORAGE_KEY, "not-json");
    expect(readStoredTechnologyPair(storage)).toBeUndefined();

    storage.setItem(
      TECHNOLOGY_PAIR_STORAGE_KEY,
      JSON.stringify({ source: "flutter", target: "flutter" }),
    );
    expect(readStoredTechnologyPair(storage)).toBeUndefined();
  });
});

describe("learning progress storage", () => {
  test("persists a unique lesson list for each technology pair", () => {
    const storage = new MemoryStorage();
    const pair = { source: "react-native", target: "kotlin" } as const;

    expect(
      writeCompletedLessons(storage, pair, ["component", "component", "list"]),
    ).toBe(true);
    expect(readCompletedLessons(storage, pair)).toEqual(["component", "list"]);
    expect(
      readCompletedLessons(storage, { source: "flutter", target: "swiftui" }),
    ).toEqual([]);
  });

  test("ignores malformed stored progress", () => {
    const storage = new MemoryStorage();
    const pair = { source: "react-native", target: "kotlin" } as const;

    storage.setItem("mobile-guide:progress", "invalid");
    expect(readCompletedLessons(storage, pair)).toEqual([]);
  });
});

describe("bookmark storage", () => {
  test("round trips unique concept and recipe bookmarks", () => {
    const storage = new MemoryStorage();

    expect(
      writeBookmarks(storage, [
        { kind: "concept", slug: "local-state" },
        { kind: "concept", slug: "local-state" },
        { kind: "recipe", slug: "api-request" },
      ]),
    ).toBe(true);
    expect(readBookmarks(storage)).toEqual([
      { kind: "concept", slug: "local-state" },
      { kind: "recipe", slug: "api-request" },
    ]);
  });

  test("ignores malformed bookmark storage", () => {
    const storage = new MemoryStorage();

    storage.setItem("mobile-guide:bookmarks", "invalid");
    expect(readBookmarks(storage)).toEqual([]);
  });
});
