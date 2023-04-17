"use client";
import { useGetFavoriteMovies } from "@/hooks/useFavoriteList";
import Movie from "../movie";
import MovieSkeleton from "../skeletons/movie";

type Props = {
  profile: string;
};
const FavoriteMovies = ({ profile }: Props) => {
  const { data, isLoading } = useGetFavoriteMovies({ userId: profile });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {data?.length ? (
        <>
          {data?.map((movie) => {
            return (
              <Movie
                key={movie.id}
                tvShows={false}
                id={Number(movie.movieId)}
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                vote_average={Number(movie.vote_average)}
              />
            );
          })}
        </>
      ) : (
        <p className="col-span-4 font-extrabold text-transparent text-lg md:text-3xl lg:text-5xl  xl:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          No movies in favorite list
        </p>
      )}
    </div>
  );
};
export default FavoriteMovies;
