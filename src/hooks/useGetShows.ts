import { useQuery } from "@tanstack/react-query";
import { APIKEY, getMovieAPI } from "@/services/API";
import { EndPoints } from "@/services/API";
import { ShowResponse } from "@/types/newTypes";

export const fetchInitialShow = async (page: number) => {
  const APIPOINT = `${EndPoints.shows}&page=${page}`;
  const res = await getMovieAPI().get<Root>(APIPOINT);
  return res.data;
};

export const useGetShows = (page: number) => {
  const { data, ...methods } = useQuery({
    queryKey: ["initial-shows", page],
    queryFn: async () => fetchInitialShow(page),
    enabled: !!page,
  });
  return {
    shows: data,
    ...methods,
  };
};

export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export const getShowInfo = async (showCode: number) => {
  const API = `/tv/${showCode}?append_to_response=videos,credits,images&api_key=${APIKEY}&language=en`;
  const res = await getMovieAPI().get<ShowResponse>(API);
  return res.data;
};

export const getExternalids = async (showCode: number) => {
  const API = `tv/${showCode}/external_ids?api_key=${APIKEY}`;
  const res = await getMovieAPI().get<ExternalIds>(API);
  return res.data;
};

export interface ExternalIds {
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  id: number;
}

export const getTvRecommendations = async (showCode: number) => {
  const API = `tv/${showCode}/recommendations?api_key=${APIKEY}&language=en-US&page=1`;
  const res = await getMovieAPI().get<Root>(API);
  const results = res.data.results.slice(0, 12);
  return results;
};
