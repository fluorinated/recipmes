import { FoodCategory } from '@models/FoodCategory';
import { Recipe } from '@models/Recipe';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RecipesState {
  recipes: Recipe[];
  isLoaded: boolean;
  tags: FoodCategory[];
}

const initialState: RecipesState = {
  recipes: [],
  isLoaded: false,
  tags: [],
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
  },
});

export const { setRecipes, setTags, setIsLoaded } = recipesSlice.actions;
export default recipesSlice.reducer;
