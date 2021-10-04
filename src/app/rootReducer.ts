import { combineReducers } from "@reduxjs/toolkit";
import genreOrCategoryReducer from "@/features/currentGenreOrCategory/CurrentGenreOrCategory";
import { tmdbApi } from "@/services/TMDB";

const rootReducer = combineReducers({
  currentGenreOrCategory: genreOrCategoryReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
