import { EndPoints, getMovieAPI } from "@/services/API";
import { useQuery } from "@tanstack/react-query";

const searchFunction = async (value: string) => {
  const API = `${EndPoints.search}&query=${value}`;
  const res = await getMovieAPI().get<Root>(API);
  return res.data;
};

const useSearch = (value: string) => {
  const { data, ...methods } = useQuery({
    queryKey: ["search", value],
    queryFn: () => searchFunction(value),
    enabled: !!value,
  });

  return {
    searchedMovies: data,
    ...methods,
  };
};

export default useSearch;

export interface Root {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: Media;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
  known_for?: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Media = "tv" | "movie" | "person";
