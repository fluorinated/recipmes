import type { RootState } from "@store/store";
export const selectSearchedText = (state: RootState) =>
  state.search.searchedText;
