import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from '@store/recipes/recipes.reducer';
import searchSlice from '@store/search/search.reducer';

export const store = configureStore({
  reducer: {
    recipes: recipesSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
