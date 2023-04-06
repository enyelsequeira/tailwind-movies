import { useQuery } from "@tanstack/react-query";
import { getMovieAPI } from "@/services/API";
import { EndPoints } from "@/services/API";

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
