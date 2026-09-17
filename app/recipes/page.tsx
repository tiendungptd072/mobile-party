import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getRecipes } from "@/lib/content/recipes";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Recipes",
  description: "Production-oriented mobile implementation recipes.",
  path: "/recipes",
});

export default function RecipesPage() {
  const recipes = getRecipes();

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">Implementation recipes</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Move from a pattern to a production-ready flow.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Each recipe keeps the workflow visible while showing how its platform
          integrations and architecture differ.
        </p>
      </header>
      <section
        className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        aria-label="Recipes"
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            className="rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
            href={`/recipes/${recipe.slug}`}
          >
            <CardHeader className="p-0">
              <CardDescription className="capitalize">
                {recipe.category}
              </CardDescription>
              <CardTitle>{recipe.title}</CardTitle>
              <p className="text-sm leading-6 text-muted">
                {recipe.description}
              </p>
            </CardHeader>
          </Link>
        ))}
      </section>
    </Container>
  );
}
