import { combineReducers } from "@reduxjs/toolkit";
import genreOrCategoryReducer from "@/features/currentGenreOrCategory/CurrentGenreOrCategory";
import { tmdbApi } from "@/services/TMDB";
import userReducer from "@/features/auth/index";

const rootReducer = combineReducers({
  currentGenreOrCategory: genreOrCategoryReducer,
  user: userReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
