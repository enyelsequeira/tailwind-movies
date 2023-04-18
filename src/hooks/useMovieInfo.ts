import { MovieInfoResponse } from "./../types/newTypes";
import { APIKEY, EndPoints, getMovieAPI } from "@/services/API";
import { useQuery } from "@tanstack/react-query";

type Data = {};
export const fetchMovieInfo = async (movieId: number) => {
  const APIPOINT = EndPoints.getMovieInfo;
  // maybe we could do some try catch here
  const res = await getMovieAPI().get<MovieInfoResponse>(
    `${APIPOINT}/${movieId}?append_to_response=videos,credits,images&api_key=${APIKEY}`
  );
  return res.data;
};
export const useGetMovieInfo = (movieId: number) => {
  const { data, ...methods } = useQuery({
    queryKey: ["movie-info", movieId],
    queryFn: () => fetchMovieInfo(movieId),
    enabled: !!movieId,
  });

  return {
    movieInfo: data,
    ...methods,
  };
};
