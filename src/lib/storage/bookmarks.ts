import type { KeyValueStorage } from "@/lib/storage/technology-pair";

export const BOOKMARK_STORAGE_KEY = "mobile-guide:bookmarks";

export const BOOKMARK_KINDS = ["concept", "recipe"] as const;

export type BookmarkKind = (typeof BOOKMARK_KINDS)[number];

export type Bookmark = {
  kind: BookmarkKind;
  slug: string;
};

function isBookmark(value: unknown): value is Bookmark {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    "slug" in value &&
    typeof value.kind === "string" &&
    BOOKMARK_KINDS.some((kind) => kind === value.kind) &&
    typeof value.slug === "string" &&
    value.slug.length > 0
  );
}

function bookmarkKey(bookmark: Bookmark): string {
  return `${bookmark.kind}:${bookmark.slug}`;
}

export function readBookmarks(storage: KeyValueStorage): readonly Bookmark[] {
  try {
    const value = storage.getItem(BOOKMARK_STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(isBookmark)
      .filter(
        (bookmark, index, bookmarks) =>
          bookmarks.findIndex(
            (candidate) => bookmarkKey(candidate) === bookmarkKey(bookmark),
          ) === index,
      );
  } catch {
    return [];
  }
}

export function writeBookmarks(
  storage: KeyValueStorage,
  bookmarks: readonly Bookmark[],
): boolean {
  try {
    const uniqueBookmarks = bookmarks.filter(
      (bookmark, index) =>
        bookmarks.findIndex(
          (candidate) => bookmarkKey(candidate) === bookmarkKey(bookmark),
        ) === index,
    );
    storage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(uniqueBookmarks));
    return true;
  } catch {
    return false;
  }
}
