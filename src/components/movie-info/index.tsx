import { useState, FC } from "react"

import { Cast, MovieInformation, TvShowsInformation } from "@/types/types"
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory/CurrentGenreOrCategory"
import { useDispatch } from "react-redux"

import { Button, Typography } from "../ui"
import { Modal } from ".."

import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import Circle from 'react-circle';

// icons
import { FaExternalLinkAlt, FaImdb, FaPlay } from "react-icons/fa"
import { MdWatchLater, MdFavoriteBorder } from "react-icons/md"

interface Props {
  data?: MovieInformation,
  shows?: TvShowsInformation
}

type MovieProps = | { data: MovieInformation; shows: never } | { shows: TvShowsInformation; data: never };
const MovieInfo: FC<Props> = (props: MovieProps) => {
  const { data } = props
  const { shows } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  // Can this be type guard?
  console.log(data);

  if (data || shows) {
    const isMovie = data?.title
    return (
      <div className="px-1 md:px-[10px] py-2  md:col-span-6 lg:col-span-3 h-full md:max-h-full">
        <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
          <Typography as="h3" className="md:tracking-wider text-center" >{data.title || shows.name}</Typography>
          <Typography as="h4" className="tracking-wide my-5"> {isMovie ? data.tagline !== "" ? data.tagline : "No Tagline" : shows.tagline !== "" ? shows.tagline : "No Tagline"}</Typography>
          {/* <div className="flex md:space-x-2 my-2 border-2 border-black dark:border-red-200/25">
            <div className="relative px-2">
              <Typography className="relative">{isMovie ? data.runtime : shows.episode_run_time[0]} Mins</Typography>
              <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
            </div>
            <div className="relative px-2 ">
              <Typography className="relative">{isMovie ? data.release_date : shows.first_air_date}</Typography>
              <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
            </div>
            <div className="relative px-2">
              <Typography className="relative">{isMovie ? data?.spoken_languages[0]?.english_name : shows.spoken_languages.length < 1 ? "Unknown" : shows.spoken_languages[0].english_name}</Typography>
            </div>

          </div> */}
        </div>



      </div>

    )
  }
}

export default MovieInfo


