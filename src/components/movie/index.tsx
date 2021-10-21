import { FC } from "react";
import { SingleResults } from "@/types/types";

import { AiFillStar } from "react-icons/ai"
import { Typography } from "../ui";

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"

interface Props {
  data?: SingleResults
  value?: number
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
  }


  return (
    <motion.div variants={variants} initial="hidden" animate="visible" custom={value} className="flex flex-col h-96 w-2/3 md:min-w-full px-1">
      <Link href={`/movies/${data.id}`} passHref>
        <a>
          <Image className="rounded shadow-2xl cursor-pointer" src={data.backdrop_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : "/images/placeholder.jpeg"} width="300" height="300" objectFit="cover" alt={data.title} blurDataURL={data.backdrop_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : "/images/placeholder.jpeg"} />
        </a>
      </Link>
      <Link href={data.media_type === "tv" ? `/shows/${data.id}` : `/movies/${data.id}`}>
        <a className="cursor-pointer ">
          <Typography className="truncate text-center md:text-justify py-1 hover:text-red-400 dark:hover:text-red-200 transition-all ease-in duration-200	" as="h3">{data.title ? data.title : data.name}</Typography>
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
    </motion.div>



  )
}

export default Movie

