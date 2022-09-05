import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchedText: string;
}

const initialState: SearchState = {
  searchedText: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
  },
});

export const { setSearchedText } = searchSlice.actions;
export default searchSlice.reducer;
