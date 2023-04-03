import { FC } from "react";
import { SingleResults, Movie } from "@/types/types";

import { AiFillStar } from "react-icons/ai";
import { Typography } from "../ui";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

interface Props {
  data?: Movie;
  value?: number;
}

const Movie: FC<Props> = ({ data, value }) => {
  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        ease: "easeIn",
        duration: 2,
      },
    }),
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={value}
      key={data.id}
      className="group relative flex flex-col overflow-hidden rounded-lg  bg-white"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <Image
          width={500}
          height={500}
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
              : "/images/placeholder.jpeg"
          }
          alt={data.title}
          blurDataURL={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900 mx-auto max-w-xs break-words truncate">
          <Link href={`/movies/${data.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {data.title}
          </Link>
        </h3>
        <div className="flex flex-1 mx-auto  ">
          {[...Array(5)].map((s, i) => {
            const ratingValue = i + 1;
            return (
              <AiFillStar
                className={`w-5 h-5 fill-current ${
                  ratingValue > data.vote_average / 2
                    ? "dark:text-gray-200 text-gray-600"
                    : "text-blue-600"
                }`}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Movie;
