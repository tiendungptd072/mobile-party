import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { BookmarkList } from "@/features/bookmarks/bookmark-list.client";
import { getConcepts } from "@/lib/content/concepts";
import { getRecipes } from "@/lib/content/recipes";
import { isLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleBookmarksPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleBookmarksPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: "/bookmarks",
    title: messages.bookmarks,
    description: messages.bookmarksPage.description,
  });
}

export default async function LocaleBookmarksPage({
  params,
}: LocaleBookmarksPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">{messages.bookmarksPage.badge}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.bookmarksPage.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.bookmarksPage.description}
        </p>
      </header>
      <BookmarkList
        concepts={getConcepts(locale)}
        recipes={getRecipes(locale)}
      />
    </Container>
  );
}
