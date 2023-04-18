"use client";

import { AiFillStar } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

interface Props {
  value?: number;
  // lets get all the props needs to be passed
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
  tvShows: boolean;
}

const Movie = ({
  value,
  id,
  backdrop_path,
  title,
  vote_average,
  tvShows = false,
}: Props) => {
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
    <motion.article
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={value}
      key={id}
      className="group relative flex flex-col overflow-hidden rounded-lg  bg-white"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <Image
          width={500}
          height={500}
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : "/images/placeholder.jpeg"
          }
          alt={title}
          blurDataURL={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900 mx-auto max-w-xs break-words truncate">
          <Link href={tvShows ? `/shows/${id}` : `/movies/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <div className="flex flex-1 mx-auto  ">
          {[...Array(5)].map((s, i) => {
            const ratingValue = i + 1;
            return (
              <AiFillStar
                className={`w-5 h-5 fill-current ${
                  ratingValue > vote_average / 2
                    ? "dark:text-gray-200 text-gray-600"
                    : "text-blue-600"
                }`}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </motion.article>
  );
};

export default Movie;
