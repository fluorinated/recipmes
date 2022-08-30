import { FoodCategory } from '@models/FoodCategory';
import { Recipe } from '@models/Recipe';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RecipesState {
  recipes: Recipe[];
  isLoaded: boolean;
  tags: FoodCategory[];
  searchedText: string;
  currentRecipe: Recipe | undefined;
}

const initialState: RecipesState = {
  recipes: [],
  isLoaded: false,
  tags: [],
  searchedText: "",
  currentRecipe: undefined,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setTags: (state, action: PayloadAction<FoodCategory[]>) => {
      state.tags = action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
    setCurrentRecipe: (state, action: PayloadAction<Recipe>) => {
      state.currentRecipe = action.payload;
    },
  },
});

export const {
  setRecipes,
  setTags,
  setIsLoaded,
  setSearchedText,
  setCurrentRecipe,
} = recipesSlice.actions;
export default recipesSlice.reducer;
