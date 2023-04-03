import {
  Actor,
  Genres,
  ImagesResults,
  MovieInformation,
  MoviesResults,
  ShowsResults,
  TvShowsInformation,
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
        // console.log(page, "page from tmdb");
        //* Get Movies by Search
        if (searchQuery) {
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

    getTvShowsAllInformation: builder.query<
      ShowsResults & ImagesResults & TvShowsInformation,
      { id: string | number; keyword?: string }
    >({
      query: ({ id, keyword }) => {
        if (!keyword) {
          return `/tv/${id}?append_to_response=videos,credits&api_key=${APIKEY}&language=en`;
        }

        return `/tv/${id}/${keyword}?api_key=${APIKEY}&language=en`;
      },
    }),
    //*  Get User Specific Lists
    getList: builder.query<
      MoviesResults,
      {
        listName: string;
        accountId: string | number;
        sessionId: string | number;
        page: number;
      }
    >({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${APIKEY}&session_id=${sessionId}&page=${page}`,
    }),

    //* Get recommendations of movies
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
  useGetTvShowsAllInformationQuery,
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
