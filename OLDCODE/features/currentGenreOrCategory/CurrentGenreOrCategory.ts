import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: { genreIdOrCategoryName: "", page: 1, searchQuery: "" },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(state.page);
      state.genreIdOrCategoryName = action.payload;
      state.page = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
