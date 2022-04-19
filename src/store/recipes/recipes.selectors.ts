import { createSelector } from '@reduxjs/toolkit';
import { selectSearchedText } from '@store/search/search.selectors';
import { filterRecipes } from '@utils/filter-recipes';

import type { RootState } from "@store/store";
export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectIsLoaded = (state: RootState) => state.recipes.isLoaded;
export const selectTags = (state: RootState) => state.recipes.tags;

export const selectFilteredRecipes = createSelector(
  selectRecipes,
  selectSearchedText,
  selectTags,
  filterRecipes
);
