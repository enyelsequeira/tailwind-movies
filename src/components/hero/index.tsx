import { Movie } from "@/types/types"
import { FC } from "react";
import Image from "next/image"
import { Typography } from "../ui";

interface Props {
  data?: Movie
}

const Hero: FC<Props> = ({ data }) => {

  return (
    <div className="relative h-80 md:col-span-4 bg-transparent w-full min-w-max   my-4 md:mx-2 ">
      <Image className="rounded-2xl rounded-t-xl rounded-l-xl" src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`} objectFit="cover" layout="fill" alt={data?.title} />
      <div className="absolute bg-black/40 text-white space-y-1 w-[300px] md:w-auto  rounded-b-2xl bottom-0 p-2 ">
        <Typography as="h2" className="text-white text-center truncate text-sm md:text-2xl font-extrabold">
          {data?.title}
        </Typography>
        <Typography as="p" className="font-body line-clamp-3 my-1 md:hover:line-clamp-none text-xs md:text-xl">
          {data?.overview}
        </Typography>
        <Typography as="p" className="text-xs md:text-xl">
          Rating: {data?.vote_average * 10} %
        </Typography>

      </div>

    </div>
  )
}
export default Hero



