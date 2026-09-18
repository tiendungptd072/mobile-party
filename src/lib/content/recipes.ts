import { rawRecipes } from "@content/recipes";
import { validateRecipes } from "@/lib/content/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { localizeRecipe } from "@/lib/i18n/content";

const recipes = validateRecipes(rawRecipes);

export function getRecipes(locale: Locale = DEFAULT_LOCALE) {
  return recipes.map((recipe) => localizeRecipe(recipe, locale));
}

export function getRecipeBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const recipe = recipes.find((candidate) => candidate.slug === slug);
  return recipe ? localizeRecipe(recipe, locale) : undefined;
}
