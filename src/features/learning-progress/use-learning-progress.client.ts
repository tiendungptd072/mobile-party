"use client";

import { useSyncExternalStore } from "react";
import {
  readCompletedLessons,
  writeCompletedLessons,
  LEARNING_PROGRESS_STORAGE_KEY,
} from "@/lib/storage/learning-progress";
import type { TechnologyPair } from "@/lib/technology-pair";

const LEARNING_PROGRESS_CHANGE_EVENT = "mobile-guide:learning-progress-change";
let volatileProgress: readonly string[] = [];

function getServerSnapshot(): string {
  return "";
}

function subscribe(onStoreChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key === LEARNING_PROGRESS_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LEARNING_PROGRESS_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LEARNING_PROGRESS_CHANGE_EVENT, onStoreChange);
  };
}

export function useLearningProgress(pair: TechnologyPair) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return JSON.stringify(readCompletedLessons(window.localStorage, pair));
      } catch {
        return JSON.stringify(volatileProgress);
      }
    },
    getServerSnapshot,
  );
  const completedLessons: readonly string[] = JSON.parse(snapshot || "[]");

  function setLessonCompleted(slug: string, completed: boolean) {
    const nextLessons = completed
      ? [...new Set([...completedLessons, slug])]
      : completedLessons.filter((lesson) => lesson !== slug);

    volatileProgress = nextLessons;

    try {
      writeCompletedLessons(window.localStorage, pair, nextLessons);
    } catch {
      // The current tab still reflects progress when browser storage is unavailable.
    }

    window.dispatchEvent(new Event(LEARNING_PROGRESS_CHANGE_EVENT));
  }

  return { completedLessons, setLessonCompleted };
}
