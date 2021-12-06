import { useState, FC, Suspense } from "react"
import dynamic from 'next/dynamic'
import Link from "next/link"
import Image from "next/image"

import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import Circle from 'react-circle';


import { Cast, TvShowsInformation } from "@/types/types"
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory/CurrentGenreOrCategory"


import { Button, Typography } from "../ui"
const Modal = dynamic(() => import('../modal'))

// icons
import { FaExternalLinkAlt, FaImdb, FaPlay } from "react-icons/fa"
import { Loader } from ".."

interface Props {
  data: TvShowsInformation
}

const ShowInfo: FC<Props> = ({ data }) => {
  // console.log({ data: data.type });
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()


  if (data) {
    const isMovie = data?.title
    return (
      <div className="px-1 md:px-[10px] py-2  md:col-span-6 lg:col-span-3 h-full md:max-h-full">
        <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
          <Typography as="h3" className="md:tracking-wider text-center" >{data.name}</Typography>
          <Typography as="h4" className="tracking-wide my-5"> {data.tagline !== "" ? data.tagline : "No Tagline"}</Typography>
          <div className="flex md:space-x-2 my-2 border-2 border-black dark:border-red-200/25">
            <div className="relative px-2">
              <Typography className="relative">{data.episode_run_time[0]} Mins</Typography>
              <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
            </div>
            <div className="relative px-2 ">
              <Typography className="relative">{data.first_air_date}</Typography>
              <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
            </div>
            <div className="relative px-2">
              <Typography className="relative">{data.spoken_languages.length < 1 ? "Unknown" : data.spoken_languages[0].english_name}</Typography>
            </div>

          </div>
        </div>
        <div>
          <Typography as="h3">Overview </Typography>
          <Typography as="p" resetStyles className="text-left md:text-justify text-xl font-body line-clamp-4 hover:line-clamp-none transition-all duration-200 ease-in cursor-pointer"> {data.overview}</Typography>
        </div>
        {/* rating and buttons */}
        <div className="flex flex-between space-x-16  md:space-x-48 ">
          <div>
            <Typography as="h3" className="my-2">Rating</Typography>
            <Circle animate={true} animationDuration="2s" responsive={false} size="100" lineWidth="40" progress={data.vote_average * 10} progressColor="rgba(36, 101, 187, 0.747)" bgColor="#ecedf0" textColor="#6b778c" textStyle={{
              font: 'bold 4rem Source Sans Pro, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
            }}
              percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
              roundedStroke={false} // Boolean: Rounded/Flat line ends
              showPercentage={true} // Boolean: Show/hide percentage.
              showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
            />
          </div>


        </div>
        <div>
          <Typography as="h3" className="my-2">Genres</Typography>
          <div className="flex space-x-4">
            {data.genres.map((genre) => {
              return (
                <Link href="/" passHref key={genre.id} >
                  <a onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                    <Typography as="p" className="hover:text-red-400 dark:hover:text-red-200" > {genre.name} </Typography>
                  </a>

                </Link>
              )

            })}
          </div>

        </div>

        {/* cast */}
        <div>
          <Typography as="h3" className="my-2">Cast</Typography>
          <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
            {data.credits.cast.slice(0, 5).map((actor: Cast) => {
              return (
                <div key={actor.id} className="flex flex-col">
                  <div className="relative h-28 md:h-32">
                    <Image className="rounded-md h-36" src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt={actor.name} objectFit="cover" layout="fill" blurDataURL={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} />
                  </div>
                  <Link href={`/cast/${actor.id}`}>
                    <a>
                      <Typography as="p" resetStyles className="truncate text-center hover:text-red-400 dark:hover:text-red-200"> {actor.name} </Typography>
                    </a>
                  </Link>


                </div>
              )
            })}
          </div>

        </div>

        <div className="flex flex-row gap-1 flex-wrap lg:flex-row justify-between items-baseline  my-2" >
          <div className="flex rounded-lg flex-row justify-between text-lg gap-1" role="group">
            {data && <a target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}`}>
              <Button variant="primary">
                <Typography>IMDB</Typography>
                <FaImdb />
              </Button>
            </a>}

            <a target="_blank" rel="noopener noreferrer" href={`${data?.homepage}`}>
              <Button variant="primary">
                <Typography>Website</Typography>
                < FaExternalLinkAlt />
              </Button>
            </a>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Typography>Trailer</Typography>
              < FaPlay />
            </Button>
          </div>

          {/* back btn */}
          <Button variant="secondary" onClick={() => router.push("/")}>
            &larr; Back
          </Button>

        </div>

        {data && isModalOpen &&
          <Suspense fallback={<Loader />}>
            <Modal open={isModalOpen} title={data.name} video={isMovie ? data.videos.results[0].key : data.videos.results[0].key} setOpen={setIsModalOpen} />
          </Suspense>
        }



      </div>

    )
  }
}


export default ShowInfo



