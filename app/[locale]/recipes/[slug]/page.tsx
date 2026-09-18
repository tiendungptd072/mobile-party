import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { RecipeCodeTabs } from "@/components/recipes/recipe-code-tabs";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { getRecipeBySlug, getRecipes } from "@/lib/content/recipes";
import { getTechnologies } from "@/lib/content/technologies";
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { formatMessage, getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleRecipeDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getRecipes().map((recipe) => ({ locale, slug: recipe.slug })),
  );
}

export async function generateMetadata({
  params,
}: LocaleRecipeDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const recipe = getRecipeBySlug(slug, locale);
  return recipe
    ? createLocalizedPageMetadata({
        locale,
        path: `/recipes/${recipe.slug}`,
        title: recipe.title,
        description: recipe.description,
      })
    : {};
}

export default async function LocaleRecipeDetailPage({
  params,
}: LocaleRecipeDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const recipe = getRecipeBySlug(slug, locale);
  if (!recipe) notFound();

  const messages = getMessages(locale);

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href={`/${locale}/recipes`}
      >
        {messages.recipes.back}
      </Link>
      <header className="mt-8 max-w-3xl">
        <Badge variant="accent" className="capitalize">
          {recipe.category}
        </Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {recipe.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {recipe.description}
        </p>
        <div className="mt-5">
          <BookmarkButton bookmark={{ kind: "recipe", slug: recipe.slug }} />
        </div>
      </header>
      <section className="mt-10" aria-labelledby="flow-title">
        <h2 id="flow-title" className="text-2xl font-semibold">
          {messages.recipes.flow}
        </h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recipe.flow.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-subtle bg-surface p-4"
            >
              <p className="text-sm font-medium text-accent">
                {formatMessage(messages.recipes.step, { count: index + 1 })}
              </p>
              <p className="mt-2 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="mt-10 max-w-5xl"
        aria-labelledby="implementation-title"
      >
        <h2 id="implementation-title" className="text-2xl font-semibold">
          {messages.recipes.implementations}
        </h2>
        <div className="mt-5">
          <RecipeCodeTabs
            ariaLabel={messages.recipes.tabs}
            implementations={recipe.implementations}
            technologies={getTechnologies()}
          />
        </div>
      </section>
      <Callout
        className="mt-10 max-w-4xl"
        title={messages.recipes.architecture}
        tone="info"
      >
        <ul className="list-disc space-y-2 pl-5">
          {recipe.architectureNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </Callout>
    </Container>
  );
}
