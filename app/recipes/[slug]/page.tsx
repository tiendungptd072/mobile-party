import Link from "next/link";
import type { Metadata } from "next";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { notFound } from "next/navigation";
import { RecipeCodeTabs } from "@/components/recipes/recipe-code-tabs";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { getRecipeBySlug, getRecipes } from "@/lib/content/recipes";
import { getTechnologies } from "@/lib/content/technologies";
import { createPageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getRecipes().map((recipe) => ({ slug: recipe.slug }));
}

type RecipeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: RecipeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  return recipe
    ? createPageMetadata({
        title: recipe.title,
        description: recipe.description,
        path: `/recipes/${recipe.slug}`,
      })
    : {};
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href="/recipes"
      >
        Back to recipes
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
          Flow
        </h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recipe.flow.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-subtle bg-surface p-4"
            >
              <p className="text-sm font-medium text-accent">
                Step {index + 1}
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
          Implementations
        </h2>
        <div className="mt-5">
          <RecipeCodeTabs
            implementations={recipe.implementations}
            technologies={getTechnologies()}
          />
        </div>
      </section>

      <Callout
        className="mt-10 max-w-4xl"
        title="Architecture notes"
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
