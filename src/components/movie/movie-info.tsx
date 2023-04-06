import { MovieInfoResponse } from "@/types/newTypes";
import Text from "../ui/typography";
import ClientCircle from "../circle";
import Button from "../ui/button";
import {
  IconBadge4k,
  IconClock,
  IconHeart,
  IconLink,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import GoBack from "../back-button";
import ModalComponentClient from "../modal/modal-component-client";

type Props = {
  movieInfo: MovieInfoResponse;
};

const MovieInfo = ({ movieInfo }: Props) => {
  return (
    <section className="px-1 md:px-[10px] h-full md:max-h-full">
      <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
        <Text size="h3" className="md:tracking-wider text-center">
          {movieInfo?.title}
        </Text>
        <Text size="h4" className="tracking-wide my-5">
          {" "}
          {movieInfo?.tagline !== "" ? movieInfo?.tagline : "No Tagline"}
        </Text>
        <div className="flex md:space-x-2 my-2 border-2 border-black dark:border-red-200/25">
          <div className="relative px-2">
            <Text className="relative">{movieInfo?.runtime} Mins</Text>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2 ">
            <Text className="relative">{movieInfo?.release_date}</Text>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2">
            <Text className="relative">
              {movieInfo?.spoken_languages[0]?.english_name}
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
          {movieInfo?.overview}
        </Text>
      </div>
      {/* rating and buttons */}
      <div className="flex flex-between space-x-16  md:space-x-48 ">
        <div>
          <Text size="h3" className="my-2">
            Rating
          </Text>
          <ClientCircle average={movieInfo?.vote_average} />
        </div>
        <div className="flex flex-col justify-end space-y-8">
          <Button variant="primary">
            <Text>Unfavorite</Text>
            <IconHeart />
          </Button>
          <Button variant="primary">
            <Text>Remove WatchList</Text>
            <IconClock />
          </Button>
        </div>
      </div>
      <div>
        <Text size="h3" className="my-2">
          Genres
        </Text>
        <div className="flex space-x-4">
          {movieInfo &&
            movieInfo.genres.map((genre) => {
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

      {/* cast */}
      <div>
        <Text size="h3" className="my-2">
          Cast
        </Text>
        <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
          {movieInfo &&
            movieInfo?.credits?.cast?.slice(0, 5).map((actor) => {
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
                  <Link href={`/cast/${actor.id}`}>
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
          {movieInfo && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${movieInfo?.imdb_id}`}
            >
              <Button variant="primary">
                <Text>IMDB</Text>
                <IconBadge4k />
              </Button>
            </a>
          )}

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${movieInfo?.homepage}`}
          >
            <Button variant="primary">
              <Text>Website</Text>
              <IconLink />
            </Button>
          </a>
          <ModalComponentClient
            movie={{
              id: movieInfo?.id,
              title: movieInfo?.title,
              video: movieInfo?.videos?.results[0]?.key,
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
