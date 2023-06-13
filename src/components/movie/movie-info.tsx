"use client";
import { FavoriteMovies, MovieInfoProps } from "@/types/newTypes";
import Text from "../ui/typography";
import ClientCircle from "../circle";
import Button from "../ui/button";
import {
  IconBadge4k,
  IconClockHour12,
  IconClockRecord,
  IconHeart,
  IconHeartFilled,
  IconLink,
} from "@tabler/icons-react";
import GoBack from "../back-button";
import ModalComponentClient from "../modal/modal-component-client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "react-toastify";
import {
  useGetFavoriteMovies,
  useGetWatchLater,
  useToggleFavorite,
  useToggleWatchLater,
} from "@/hooks/useFavoriteList";
import Genres from "./genres";
import Cast from "./cast";

const MovieInfo = ({
  title,
  tagline,
  runtime,
  release_date,
  spoken_languages,
  backdrop_path,
  overview,
  homepage,
  videos,
  id,
  vote_average,
  imdb_id,
  credits,
  genres,
  userId,
  isShow,
}: MovieInfoProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetFavoriteMovies({
    userId: userId as string,
  });
  const { watchLaterMovies } = useGetWatchLater({ userId: userId as string });

  const isMovieFavorited =
    data && data
      ? data?.some((movie: FavoriteMovies) => movie.movieId === id)
      : false;

  const isMovieWatchLater = watchLaterMovies
    ? watchLaterMovies?.some((movie: FavoriteMovies) => movie.movieId === id)
    : false;

  const { mutate } = useToggleFavorite();
  const watchLater = useToggleWatchLater();
  const movieProps = {
    backdrop_path,
    homepage,
    title,
    movieId: id,
    original_title: title,
    popularity: String(vote_average),
    poster_path: backdrop_path,
    tagline,
    vote_average: String(vote_average),
    vote_count: String(vote_average),
    userId: userId as string,
  };

  const watchLaterFn = () => {
    if (!userId) {
      toast.error("Please login to add to watch later list", {
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        theme: "colored",
        autoClose: 2000,
      });
      return;
    }
    watchLater.mutate(
      { movieProps },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["watchLaterMovies"],
          });
          isMovieWatchLater
            ? toast.success("Movie removed from watch later", {
                hideProgressBar: true,
                pauseOnFocusLoss: false,
                theme: "colored",
                autoClose: 2000,
              })
            : toast.success("Movie added to watch later", {
                hideProgressBar: true,
                pauseOnFocusLoss: false,
                theme: "colored",
                autoClose: 2000,
              });
        },
      }
    );
  };

  const TrailerOrTease = videos.results.find((v) => {
    if (v.type === "Trailer") return v;
    return v.type === "Teaser";
  });

  return (
    <section className="px-1 md:px-[10px] h-full md:max-h-full">
      <div className="mt-5 flex flex-col items-center md:items-center">
        <Text size="h3" className="md:tracking-wider text-center">
          {title}
        </Text>
        <Text size="h4" className="tracking-wide my-5">
          {tagline !== "" ? tagline : "No Tagline"}
        </Text>
        <div className="flex md:space-x-2 my-2 border-2 border-black dark:border-red-200/25">
          <div className="relative px-2">
            <Text className="relative">{runtime} Mins</Text>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2 ">
            <Text className="relative">{release_date}</Text>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2">
            <Text className="relative">
              {spoken_languages[0]?.english_name}
            </Text>
          </div>
        </div>
      </div>
      <div>
        <Text size="h3">Overview </Text>
        <Text
          as="p"
          className="text-left md:text-justify text-xl font-body line-clamp-4 hover:line-clamp-none transition-all duration-200 ease-in cursor-pointer"
        >
          {overview}
        </Text>
      </div>
      {/* rating and buttons */}
      <div className="flex flex-between space-x-16  md:space-x-48 ">
        <div>
          <Text size="h3" className="my-2">
            Rating
          </Text>
          <ClientCircle average={vote_average} />
        </div>
        <div className="flex flex-col justify-end space-y-8">
          {isShow ? null : (
            <button
              onClick={() => {
                if (!userId) {
                  toast.error("Please login to add to favorite", {
                    hideProgressBar: true,
                    pauseOnFocusLoss: false,
                    theme: "colored",
                    autoClose: 2000,
                  });
                  return;
                }
                mutate(
                  { movieProps },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["favoriteMovies"],
                      });
                      isMovieFavorited
                        ? toast.success("Movie removed from favorites", {
                            hideProgressBar: true,
                            pauseOnFocusLoss: false,
                            theme: "colored",
                            autoClose: 2000,
                          })
                        : toast.success("Movie added to favorites", {
                            hideProgressBar: true,
                            pauseOnFocusLoss: false,
                            theme: "colored",
                            autoClose: 2000,
                          });
                    },
                  }
                );
              }}
              className={clsx("border w-fit  border-black/10 rounded-md", {
                "bg-red-400": isMovieFavorited,
                "bg-white": !isMovieFavorited,
              })}
            >
              {isMovieFavorited ? (
                <IconHeartFilled className="text-red-200" />
              ) : (
                <IconHeart className="text-blue-500" />
              )}
            </button>
          )}
          {isShow ? null : (
            <button
              onClick={watchLaterFn}
              className={clsx("border w-fit  border-black/10 rounded-md", {
                "bg-red-400": isMovieWatchLater,
                "bg-white": !isMovieWatchLater,
              })}
            >
              {isMovieWatchLater ? (
                <IconClockRecord className="text-red-200" />
              ) : (
                <IconClockHour12 className="text-blue-500" />
              )}
            </button>
          )}
        </div>
      </div>
      <Genres genres={genres} />
      <Cast credits={credits} />

      <div className="flex flex-row gap-1 flex-wrap lg:flex-row justify-between items-baseline  my-2">
        <div
          className="flex rounded-lg flex-row justify-between text-lg gap-1"
          role="group"
        >
          {imdb_id && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${imdb_id}`}
            >
              <Button variant="primary">
                <Text>IMDB</Text>
                <IconBadge4k />
              </Button>
            </a>
          )}

          <a target="_blank" rel="noopener noreferrer" href={`${homepage}`}>
            <Button variant="primary">
              <Text>Website</Text>
              <IconLink />
            </Button>
          </a>
          <ModalComponentClient
            movie={{
              id,
              title: title,
              video: TrailerOrTease?.key as string,
            }}
          />
        </div>

        <GoBack />
      </div>
    </section>
  );
};

export default MovieInfo;
