"use client";

import { useSyncExternalStore } from "react";
import {
  BOOKMARK_STORAGE_KEY,
  readBookmarks,
  writeBookmarks,
  type Bookmark,
} from "@/lib/storage/bookmarks";

const BOOKMARK_CHANGE_EVENT = "mobile-guide:bookmark-change";
let volatileBookmarks: readonly Bookmark[] = [];

function subscribe(onStoreChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key === BOOKMARK_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(BOOKMARK_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(BOOKMARK_CHANGE_EVENT, onStoreChange);
  };
}

export function useBookmarks() {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return JSON.stringify(readBookmarks(window.localStorage));
      } catch {
        return JSON.stringify(volatileBookmarks);
      }
    },
    () => "[]",
  );
  const bookmarks: readonly Bookmark[] = JSON.parse(snapshot);

  function toggleBookmark(bookmark: Bookmark) {
    const isSaved = bookmarks.some(
      (item) => item.kind === bookmark.kind && item.slug === bookmark.slug,
    );
    const nextBookmarks = isSaved
      ? bookmarks.filter(
          (item) => item.kind !== bookmark.kind || item.slug !== bookmark.slug,
        )
      : [...bookmarks, bookmark];

    volatileBookmarks = nextBookmarks;

    try {
      writeBookmarks(window.localStorage, nextBookmarks);
    } catch {
      // The current tab keeps bookmark state when storage is unavailable.
    }

    window.dispatchEvent(new Event(BOOKMARK_CHANGE_EVENT));
  }

  return { bookmarks, toggleBookmark };
}
