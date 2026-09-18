"use client";

import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/features/bookmarks/use-bookmarks.client";
import type { Bookmark } from "@/lib/storage/bookmarks";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

type BookmarkButtonProps = {
  bookmark: Bookmark;
};

export function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  const messages = useLocaleMessages();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const isSaved = bookmarks.some(
    (item) => item.kind === bookmark.kind && item.slug === bookmark.slug,
  );

  return (
    <Button
      aria-pressed={isSaved}
      size="small"
      variant="secondary"
      onClick={() => toggleBookmark(bookmark)}
    >
      {isSaved ? messages.saved : messages.save}
    </Button>
  );
}
