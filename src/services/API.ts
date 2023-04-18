import axios, { AxiosInstance } from "axios";
import { env } from "../env/client.mjs";

const MOVIEAPI = "https://api.themoviedb.org/3";
export const APIKEY = env.NEXT_PUBLIC_API_KEY;
// we could do something like this as well to have better typesafety
export const EndPoints = {
  getGenres: `genre/movie/list?api_key=${APIKEY}`,
  getMoviesByCategory: "discover/movie",
  getMovieInfo: "movie",
  generalMovie: "movie",
  shows: `tv/top_rated?api_key=${APIKEY}&language=en-US`,
  search: `/search/multi?api_key=${APIKEY}`,
} as const;

// create a types out of the object
type EndPointType = typeof EndPoints;

// create a union from the object keys
type EndPointKeys = keyof EndPointType;

//  create a union from the object values
export type EndPointValues = EndPointType[EndPointKeys];

const MoviesAPI: AxiosInstance = axios.create({
  baseURL: MOVIEAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMovieAPI = (): AxiosInstance => {
  if (!MoviesAPI) {
    throw new Error("No Movies API found");
  }
  return MoviesAPI;
};
