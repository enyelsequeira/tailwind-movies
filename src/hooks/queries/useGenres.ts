import { GenresData } from "@/types/types";
import { EndPoints, getMovieAPI } from "@/services/API";
import { useQuery } from "@tanstack/react-query";

type Data = {
  genres: GenresData[];
};

export const fetchGenres = async () => {
  // maybe we could do some try catch here
  const res = await getMovieAPI().get<Data>(EndPoints.getGenres);
  return res.data;
};
export const useGenres = () => {
  const { data, ...methods } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  return {
    genres: data?.genres,
    ...methods,
  };
};
