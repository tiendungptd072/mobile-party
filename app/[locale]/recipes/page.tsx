import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getRecipes } from "@/lib/content/recipes";
import { isLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleRecipesPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleRecipesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: "/recipes",
    title: messages.recipes.badge,
    description: messages.recipes.description,
  });
}

export default async function LocaleRecipesPage({
  params,
}: LocaleRecipesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);
  const recipes = getRecipes(locale);

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">{messages.recipes.badge}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.recipes.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.recipes.description}
        </p>
      </header>
      <section
        className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        aria-label={messages.recipes.badge}
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            className="rounded-xl border border-subtle bg-surface p-5 transition-colors hover:bg-surface-raised"
            href={`/${locale}/recipes/${recipe.slug}`}
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
