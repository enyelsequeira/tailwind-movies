import { Movie, MovieInformation, MoviesResults } from "@/types/types";
import { FC, useState, useEffect } from "react";
import Typography from "../ui/typography";
import Image from "next/image"
import Link from "next/link"
import { AiFillStar } from "react-icons/ai"
import Pagination from "../pagination";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "@/services/TMDB";


interface Props {
  data?: Movie | MovieInformation
  key?: number
}


const SingleMovie: FC<Props> = ({ data }) => {

  return (
    <div className="flex flex-col h-80 w-2/3 md:min-w-full px-1">
      <Link href={`/movies/${data.id}`} passHref>
        <a>
          <Image className="rounded shadow-2xl cursor-pointer" src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} width="300" height="300" objectFit="cover" alt={data.title} blurDataURL={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} />
        </a>
      </Link>

      <Link href={`/movies/${data.id}`}>
        <a className="cursor-pointer ">
          <Typography className="truncate text-center md:text-justify py-1 hover:text-red-400 dark:hover:text-red-200 transition-all ease-in duration-200	" as="h3">{data.title}</Typography>
        </a>
      </Link>
      <div className="flex my-4 md:my-4 justify-center">
        {
          [...Array(5)].map((s, i) => {
            const ratingValue = i + 1;
            return (
              <AiFillStar className={`w-5 h-5 fill-current ${ratingValue > data.vote_average / 2 ? "dark:text-gray-200 text-gray-600" : "text-blue-600"}`
              } key={i} />
            )

          })
        }
      </div>
    </div>



  )
}

export default SingleMovie

