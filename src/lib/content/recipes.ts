import { rawRecipes } from "@content/recipes";
import { validateRecipes } from "@/lib/content/schema";

const recipes = validateRecipes(rawRecipes);

export function getRecipes() {
  return recipes;
}

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
