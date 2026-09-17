import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { BookmarkList } from "@/features/bookmarks/bookmark-list.client";
import { getConcepts } from "@/lib/content/concepts";
import { getRecipes } from "@/lib/content/recipes";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Bookmarks",
  description: "Return to mobile concepts and recipes saved on this device.",
  path: "/bookmarks",
});

export default function BookmarksPage() {
  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">On this device</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Your saved learning references.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Bookmarks are stored locally in this browser and are not shared with a
          server.
        </p>
      </header>
      <BookmarkList concepts={getConcepts()} recipes={getRecipes()} />
    </Container>
  );
}
