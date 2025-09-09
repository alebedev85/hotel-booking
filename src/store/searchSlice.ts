import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const initialState: SearchState = {
  location: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SearchState>) {
      return action.payload;
    },
    resetSearch() {
      return initialState;
    },
  },
});

export const { setSearch, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
