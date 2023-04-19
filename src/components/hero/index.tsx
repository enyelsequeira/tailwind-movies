import Image from "next/image";
import Link from "next/link";
import Text from "../ui/typography";
import { Movie } from "@/types/newTypes";

interface Props {
  data?: Movie;
}

const Hero = ({ data }: Props) => {
  return (
    <article className="hidden md:block relative h-80 md:col-span-3 bg-transparent w-full min-w-max   my-4 md:mx-2 ">
      {data && (
        <>
          <Link href={`/movies/${data.id}`} passHref>
            <Image
              fill
              className="rounded-2xl rounded-t-xl rounded-l-xl cursor-pointer object-cover object-center  transition-opacity duration-500 ease-in-out opacity-0"
              src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt={data?.title}
              blurDataURL={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </Link>
          <div className="absolute bg-black/40 text-white space-y-1 w-[300px] md:w-auto  rounded-b-2xl bottom-0 p-2 ">
            <Link href={`/movies/${data.id}`} passHref>
              <Text
                size="h2"
                className="text-white text-center truncate text-sm md:text-2xl font-extrabold hover:text-red-300"
              >
                {data.title}
              </Text>
            </Link>
            <Text
              size="base"
              className="font-body line-clamp-3 my-1  text-xs md:text-xl"
            >
              {data.overview}
            </Text>
            <Text size="base" className="text-xs md:text-xl">
              Rating: {data.vote_average * 10} %
            </Text>
          </div>
        </>
      )}
    </article>
  );
};
export default Hero;
