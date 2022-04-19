import { FoodCategory } from '@models/FoodCategory';
import { Recipe } from '@models/Recipe';

export const filterRecipes = (
  recipes: Recipe[],
  text: string,
  tags: FoodCategory[]
): Recipe[] => {
  const byTags = filterRecipesByTags(recipes, tags);
  const byTagsAndText = filterRecipesByText(byTags, text);
  return byTagsAndText;
};

export const filterRecipesByTags = (
  recipes: Recipe[],
  tags: FoodCategory[]
): Recipe[] => {
  return tags.length > 0
    ? recipes.filter((r: Recipe) =>
        tags.every((tag) => r.categories.includes(tag))
      )
    : recipes;
};

export const filterRecipesByText = (
  recipes: Recipe[],
  text: string
): Recipe[] => {
  const getCategories = (r: Recipe) =>
    r.categories.map((c) => c.toLowerCase().split(" ")).flat();
  const getIngredients = (r: Recipe) =>
    r.ingredients.map((i) => i.title.toLowerCase().split(" ")).flat();
  const getSteps = (r: Recipe) =>
    r.steps.map((s) => s.toLowerCase().split(" ")).flat();
  const getTitle = (r: Recipe) => r.title.toLowerCase().split(" ").flat();
  const res = recipes.filter(
    (r: Recipe) =>
      [
        ...getCategories(r),
        ...getSteps(r),
        ...getIngredients(r),
        ...getTitle(r),
      ].filter((el) => el.includes(text.toLowerCase())).length > 0
  );
  return res;
};
