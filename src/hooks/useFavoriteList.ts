import { FavoriteMovies } from "@/types/newTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  userId: string;
};
export const getFavoriteMovies = async ({ userId }: Params) => {
  const res = await axios.get<FavoriteMovies[]>("/api/favorite", {
    params: {
      userId: userId,
    },
  });
  return res.data;
};

export const getWatchLaterMovies = async ({ userId }: Params) => {
  const res = await axios.get<FavoriteMovies[]>("/api/watchlater", {
    params: {
      userId: userId,
    },
  });
  return res.data;
};

export const useGetFavoriteMovies = ({ userId }: Params) => {
  const { data, ...methods } = useQuery({
    queryKey: ["favoriteMovies"],
    queryFn: () => getFavoriteMovies({ userId }),
    enabled: !!userId,
  });

  return {
    data,
    ...methods,
  };
};

export const useGetWatchLater = ({ userId }: Params) => {
  {
    const { data, ...methods } = useQuery({
      queryKey: ["watchLaterMovies"],
      queryFn: () => getWatchLaterMovies({ userId }),
      enabled: !!userId,
    });
    return {
      watchLaterMovies: data,
      ...methods,
    };
  }
};

type param = {
  movieProps: {
    backdrop_path: string;
    homepage: string;
    title: string;
    movieId: number;
    original_title: string;
    popularity: string;
    poster_path: string;
    tagline: string;
    vote_average: string;
    vote_count: string;
    userId: string;
  };
};
const toggleFav = async (param: param) => {
  try {
    const response = await axios.post("/api/favorite", {
      movieProps: param.movieProps,
    });
    return response;
  } catch (error) {
    console.log({ error }, "error with posting movie");
  }
};

export const useToggleFavorite = () => {
  const { mutate, ...methods } = useMutation({
    mutationKey: ["add-to-favorite"],
    mutationFn: toggleFav,
  });
  return {
    mutate,
    ...methods,
  };
};

const toggleWatchlater = async (param: param) => {
  try {
    const response = await axios.post("/api/watchlater", {
      movieProps: param.movieProps,
    });
    return response;
  } catch (error) {
    console.log({ error }, "error with watch later movie");
  }
};

export const useToggleWatchLater = () => {
  const { mutate, ...methods } = useMutation({
    mutationKey: ["add-to-watchlater"],
    mutationFn: toggleWatchlater,
  });
  return {
    mutate,
    ...methods,
  };
};
