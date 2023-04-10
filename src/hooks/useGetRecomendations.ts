import { APIKEY, getMovieAPI } from "@/services/API";

export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovieRecomendations = async (movie: number) => {
  const API_POINT = `movie/${movie}/recommendations?api_key=${APIKEY}`;
  const res = await getMovieAPI().get<Root>(API_POINT);
  const results = res.data.results.slice(0, 12);
  return results;
};
