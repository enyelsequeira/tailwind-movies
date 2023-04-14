import { usePaginationStore } from "./../store/useCategoriesStore";
import { useQuery } from "@tanstack/react-query";
import { APIKEY, getMovieAPI } from "@/services/API";
import { EndPoints } from "@/services/API";
import useCategoriesStore from "@/store/useCategoriesStore";
import { Movie } from "@/types/newTypes";

export type Categories = "upcoming" | "popular" | "top_rated";
export interface Root {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchInitialdata = async () => {
  const categories = useCategoriesStore.getState().categories;
  const page = usePaginationStore.getState().currentPage;
  const APIPOINT = `${EndPoints.generalMovie}/${categories}?page=${page}&api_key=${APIKEY}`;
  const res = await getMovieAPI().get<Root>(APIPOINT);
  return res.data;
};

export const useGetTest = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const page = usePaginationStore((state) => state.currentPage);
  const { data, ...methods } = useQuery({
    queryKey: ["initial-page", categories, page],
    queryFn: fetchInitialdata,
    enabled: !!categories,
  });
  return {
    initialPage: data,
    ...methods,
  };
};
