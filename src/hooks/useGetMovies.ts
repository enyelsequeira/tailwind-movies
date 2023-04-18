import { APIKEY, EndPoints, getMovieAPI } from "@/services/API";
import { Movie } from "@/types/newTypes";
import { useQuery } from "@tanstack/react-query";

type Data = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export const fetchMovies = async (page, genreId) => {
  const APIPOINT = EndPoints.getMoviesByCategory;
  // maybe we could do some try catch here
  const res = await getMovieAPI().get<Data>(
    `${APIPOINT}?with_genres=${genreId}&page=${page}&api_key=${APIKEY}`
  );
  return res.data;
};
export const useGetMovies = ({
  page = 1,
  genreId,
}: {
  page?: number;
  genreId?: number;
}) => {
  const { data, ...methods } = useQuery({
    queryKey: ["movies", page, genreId],
    queryFn: () => fetchMovies(page, genreId),
    enabled: !!genreId && !!page,
  });

  return {
    movies: data,
    ...methods,
  };
};
