import { createSelector } from '@reduxjs/toolkit';
import { filterRecipes } from '@utils/filter-recipes';

import type { RootState } from "store/store";
export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectIsLoaded = (state: RootState) => state.recipes.isLoaded;
export const selectSearchedText = (state: RootState) =>
  state.recipes.searchedText;
export const selectTags = (state: RootState) => state.recipes.tags;
export const selectCurrentRecipe = (state: RootState) =>
  state.recipes.currentRecipe;

export const selectFilteredRecipes = createSelector(
  selectRecipes,
  selectSearchedText,
  selectTags,
  filterRecipes
);
