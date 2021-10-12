import {
  Actor,
  Genres,
  ImagesResults,
  MovieInformation,
  MoviesResults,
  ShowsResults,
} from "./../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //*  Get Movies by Genre

    getGenres: builder.query<Genres, null>({
      query: () => `genre/movie/list?api_key=4e0d07555e20e0345f6bd12869b2604e`,
    }),

    //*  Get Movies by [Type]
    getMovies: builder.query<
      MoviesResults,
      {
        page: number;
        searchQuery: string;
        genreIdOrCategoryName: string | number;
      }
    >({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movies by Search
        if (searchQuery) {
          console.log(searchQuery, "from resource");
          console.log("search query");
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${APIKEY}`;
        }

        //* Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${APIKEY}`;
        }

        //* Get Movies by Genre
        if (typeof genreIdOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${APIKEY}`;
        }

        //* Get Popular Movies
        return `movie/popular?page=${page}&api_key=${APIKEY}`;
      },
    }),

    //*  Get Movie
    getMovie: builder.query<MovieInformation, { id: string | number }>({
      query: ({ id }) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${APIKEY}`,
    }),
    // * Get Movie Image
    getMovieImages: builder.query<ImagesResults, { id: string | number }>({
      query: ({ id }) => `/movie/${id}/images?api_key=${APIKEY}`,
    }),

    //* Get top Rated tv Shows
    getTopRatedShows: builder.query<
      ShowsResults,
      { name: string; page: number }
    >({
      query: ({ name, page }) =>
        `/tv/${name}?api_key=${APIKEY}&language=en-US&page=${page}`,
    }),

    //*  Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${APIKEY}&session_id=${sessionId}&page=${page}`,
    }),
    getRecommendations: builder.query<
      MoviesResults,
      { movie_id: string | number; list: string }
    >({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${APIKEY}`,
    }),
    // Getting information about the actors details/movies and image
    getActorsDetails: builder.query<Actor, number | string>({
      query: (id) => `person/${id}?api_key=${APIKEY}`,
    }),
    getMoviesByActorId: builder.query<
      MoviesResults,
      { id: number | string; page: number }
    >({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${APIKEY}`,
    }),
    getActorImages: builder.query<ImagesResults, { id: number | string }>({
      query: ({ id }) => {
        return `person/${id}/images?api_key=${APIKEY}`;
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetActorImagesQuery,
  useGetMovieImagesQuery,
  useGetTopRatedShowsQuery,
} = tmdbApi;
