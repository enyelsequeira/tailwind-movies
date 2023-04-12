"use client";
import { Credits, FavoriteMovies, Genre, Videos } from "@/types/newTypes";
import Text from "../ui/typography";
import ClientCircle from "../circle";
import Button from "../ui/button";
import {
  IconBadge4k,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconLink,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import GoBack from "../back-button";
import ModalComponentClient from "../modal/modal-component-client";
import { Languages } from "@/types/types";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { match, P } from "ts-pattern";
import { toast } from "react-toastify";

type Props = {
  tagline: string;
  runtime: number;
  genres?: Genre[];
  homepage: string;
  imdb_id: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  spoken_languages: Languages[];
  id: number;
  videos: Videos;
  credits: Credits;
  userId: string;
};

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
}: Props) => {
  const queryClient = useQueryClient();
  const toggleFav = async () => {
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
      userId: userId,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/favorite", {
        movieProps,
      });
      return response;
    } catch (error) {
      console.log({ error }, "error with posting movie");
    }
  };

  const getFavoriteMovies = async () => {
    const res = await axios.get<FavoriteMovies[]>(
      "http://localhost:3000/api/favorite",
      {
        params: {
          movieId: id,
          userId: userId,
        },
      }
    );
    console.log({ res });
    return res.data;
  };
  const { data } = useQuery({
    queryKey: ["add-to-favorite", id],
    queryFn: getFavoriteMovies,
    enabled: !!userId,
  });
  const isMovieFavorited =
    data?.some((movie: FavoriteMovies) => movie.movieId === id) ?? false;

  const { mutate } = useMutation({
    mutationKey: ["add-to-favorite", id],
    mutationFn: toggleFav,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["add-to-favorite", id],
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
  });

  console.log({ isMovieFavorited });

  return (
    <section className="px-1 md:px-[10px] h-full md:max-h-full">
      <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
        <Text size="h3" className="md:tracking-wider text-center">
          {title}
        </Text>
        <Text size="h4" className="tracking-wide my-5">
          {" "}
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
          <button
            onClick={() => {
              if (!userId) {
                toast.error("Please login to add to favorite");
              }
              mutate();
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
          <Button variant="primary">
            <Text>Remove WatchList</Text>
            <IconClock />
          </Button>
        </div>
      </div>
      {genres ? (
        <div>
          <Text size="h3" className="my-2">
            Genres
          </Text>
          <div className="flex space-x-4">
            {genres.map((genre) => {
              return (
                <Link href={`/genres/${genre.id}`} passHref key={genre.id}>
                  <Text
                    as="p"
                    className="hover:text-red-400 dark:hover:text-red-200"
                  >
                    {genre.name}{" "}
                  </Text>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* cast */}
      <div>
        <Text size="h3" className="my-2">
          Cast
        </Text>
        <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
          {credits &&
            credits?.cast?.slice(0, 5).map((actor) => {
              return (
                <div key={actor.id} className="flex flex-col">
                  <div className="relative h-28 md:h-32">
                    <Image
                      className="rounded-md h-36 object-cover"
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original/${actor?.profile_path}`
                          : "/images/placeholder.jpeg"
                      }
                      alt={actor.name}
                      fill
                      blurDataURL={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original/${actor?.profile_path}`
                          : "/images/placeholder.jpeg"
                      }
                    />
                  </div>
                  <Link
                    href={{
                      pathname: "/cast",
                      query: { id: actor.id },
                    }}
                    // href={{
                    //   href: "/cas",
                    //   query: { id: actor.id },
                    // }}
                  >
                    <Text
                      size="base"
                      className="truncate text-center hover:text-red-400 dark:hover:text-red-200"
                    >
                      {actor.name}{" "}
                    </Text>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

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
              video: videos?.results[0]?.key,
            }}
          />
        </div>

        {/* back btn */}
        <GoBack />
      </div>
    </section>
  );
};

export default MovieInfo;
