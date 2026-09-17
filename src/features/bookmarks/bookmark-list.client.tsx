"use client";

import Link from "next/link";
import { useBookmarks } from "@/features/bookmarks/use-bookmarks.client";
import type { Concept } from "@/types/concept";
import type { Recipe } from "@/types/recipe";

type BookmarkListProps = {
  concepts: readonly Concept[];
  recipes: readonly Recipe[];
};

export function BookmarkList({ concepts, recipes }: BookmarkListProps) {
  const { bookmarks } = useBookmarks();
  const items = bookmarks.flatMap((bookmark) => {
    if (bookmark.kind === "concept") {
      const concept = concepts.find((item) => item.slug === bookmark.slug);
      return concept
        ? [{ bookmark, title: concept.title, description: concept.description }]
        : [];
    }

    const recipe = recipes.find((item) => item.slug === bookmark.slug);
    return recipe
      ? [{ bookmark, title: recipe.title, description: recipe.description }]
      : [];
  });

  if (items.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-subtle bg-surface-raised p-5 text-sm text-muted">
        You have not saved anything yet. Save a concept or recipe to return to
        it later.
      </p>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map(({ bookmark, description, title }) => (
        <li key={`${bookmark.kind}:${bookmark.slug}`}>
          <Link
            className="block rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
            href={`/${bookmark.kind === "concept" ? "dictionary" : "recipes"}/${bookmark.slug}`}
          >
            <p className="text-sm font-medium capitalize text-accent">
              {bookmark.kind}
            </p>
            <h2 className="mt-2 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
