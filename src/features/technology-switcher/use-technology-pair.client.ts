"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_TECHNOLOGY_PAIR,
  parseTechnologyPair,
  serializeTechnologyPair,
  type TechnologyPair,
} from "@/lib/technology-pair";
import {
  readStoredTechnologyPair,
  TECHNOLOGY_PAIR_STORAGE_KEY,
  writeStoredTechnologyPair,
} from "@/lib/storage/technology-pair";

const TECHNOLOGY_PAIR_CHANGE_EVENT = "mobile-guide:technology-pair-change";
const defaultSnapshot = serializeTechnologyPair(DEFAULT_TECHNOLOGY_PAIR);
let volatileSnapshot = defaultSnapshot;

function getServerSnapshot(): string {
  return defaultSnapshot;
}

function getClientSnapshot(): string {
  try {
    const storedPair = readStoredTechnologyPair(window.localStorage);

    return storedPair ? serializeTechnologyPair(storedPair) : volatileSnapshot;
  } catch {
    return volatileSnapshot;
  }
}

function subscribe(onStoreChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key === TECHNOLOGY_PAIR_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(TECHNOLOGY_PAIR_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(TECHNOLOGY_PAIR_CHANGE_EVENT, onStoreChange);
  };
}

export function useTechnologyPair() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const pair = parseTechnologyPair(snapshot) ?? DEFAULT_TECHNOLOGY_PAIR;

  function setPair(nextPair: TechnologyPair) {
    volatileSnapshot = serializeTechnologyPair(nextPair);

    try {
      writeStoredTechnologyPair(window.localStorage, nextPair);
    } catch {
      // The in-memory pair keeps the current session functional without storage.
    }

    window.dispatchEvent(new Event(TECHNOLOGY_PAIR_CHANGE_EVENT));
  }

  return { pair, setPair };
}
