import { moviesApi } from "@/helpers";
import { useGetListQuery } from "@/services/TMDB";
import { MovieInformation } from "@/types/types";
import { useEffect, useState } from "react";

/**
 *
 * @params
 *  @param {string} userId
 *  @param {string} sessionId
 *  @param {any} movieId
 * @param {MovieInformation} data
 * @returns addToFavorite, addToWatchList as functions and returns the state state for isWatchList and isFavorite
 */
const useAdd = ({
  userId,
  sessionId,
  movieId,
  data,
}: {
  userId: string;
  sessionId: string;
  movieId: any;
  data: MovieInformation;
}) => {
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const [isAddToFavorite, setIsAddToFavorite] = useState(false);

  const { data: watchlist } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: userId,
    sessionId,
    page: 1,
  });
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: userId,
    sessionId,
    page: 1,
  });

  const addToWatchlist = async () => {
    await moviesApi.post(
      `/account/${userId}/watchlist?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  const addToFavorites = async () => {
    await moviesApi.post(
      `/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: !isAddToFavorite,
      }
    );
    setIsAddToFavorite((prev) => !prev);
  };

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlist?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlist, data]);
  useEffect(() => {
    setIsAddToFavorite(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  return {
    addToWatchlist,
    isMovieWatchlisted,
    addToFavorites,
    isAddToFavorite,
  };
};

export default useAdd;
