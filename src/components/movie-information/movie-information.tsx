import Main from "@/components/main/main"
import Typography from "@/components/ui/typography"
import Layout from "@/layout"
import { useGetMovieImagesQuery, useGetMovieQuery, useGetRecommendationsQuery } from "@/services/TMDB"
import { useRouter } from "next/router"
import Image from "next/image"
import { GetServerSideProps } from 'next'

import { useState, useEffect } from "react"
import Circle from 'react-circle';
import { FaExternalLinkAlt, FaImdb, FaPlay } from "react-icons/fa"
import MovieImagesCarrousel from "@/components/movie-images-carrousel/movie-images-carrousel"
import { MdWatchLater, MdFavoriteBorder } from "react-icons/md"
import SingleMovie from "@/components/movie/movie"

const MovieInfo = ({ data }) => {

  return (
    <div className="px-1 md:px-[10px] py-2  md:col-span-6 lg:col-span-3 h-full md:max-h-full">
      <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
        <Typography as="h3" className="md:tracking-wider text-center" >{data?.title}</Typography>
        <Typography as="h4" className="tracking-wide my-5"> {data?.tagline} </Typography>
        <div className="flex md:space-x-2 my-2 md:border-2 md:border-black">
          <div className="relative px-2">
            <Typography className="relative">{data?.runtime} Mins</Typography>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2 ">
            <Typography className="relative">{data?.release_date}</Typography>
            <span className="divide-x-2 border-[1px] h-4 my-auto rotate-12 border-red-700 absolute top-1 -right-1" />
          </div>
          <div className="relative px-2">
            <Typography className="relative">{data?.spoken_languages[0].english_name}</Typography>
          </div>

        </div>
      </div>

      <div>
        <Typography as="h3">Overview </Typography>
        <Typography as="p" resetStyles className="text-left md:text-justify text-xl font-body line-clamp-4 hover:line-clamp-none"> {data?.overview}</Typography>
      </div>
      <div>
        <Typography as="h3" className="my-2">Rating</Typography>
        <Circle animate={true} animationDuration="2s" responsive={false} size="100" lineWidth="40" progress={data?.vote_average * 10} progressColor="rgba(36, 101, 187, 0.747)" bgColor="#ecedf0" textColor="#6b778c" textStyle={{
          font: 'bold 4rem Source Sans Pro, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
        }}
          percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
          roundedStroke={false} // Boolean: Rounded/Flat line ends
          showPercentage={true} // Boolean: Show/hide percentage.
          showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
        />
      </div>
      <div>
        <Typography as="h3" className="my-2">Genres</Typography>
        <div className="flex space-x-4">
          {data?.genres.map((genre) => {
            return (
              <Typography key={genre.id}> {genre.name} </Typography>
            )
          })}
        </div>

      </div>

      {/* cast */}
      <div>
        <Typography as="h3" className="my-2">Cast</Typography>
        <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
          {data?.credits.cast.slice(0, 5).map((actor) => {
            return (
              <div key={actor.id} className="flex flex-col">
                <div className="relative h-28 md:h-32">
                  <Image className="rounded-md h-36" src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`} alt={actor?.name} objectFit="cover" layout="fill" />
                </div>

                <Typography as="p" resetStyles className="truncate text-center"> {actor.name} </Typography>

              </div>
            )
          })}
        </div>

      </div>

      <div className="flex rounded-lg text-lg gap-1 justify-around md:justify-between lg:justify-around py-2" role="group">
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
          <Typography>Favorite</Typography>
          <MdFavoriteBorder />
        </button>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
          <Typography>WatchList</Typography>
          <MdWatchLater />
        </button>
      </div>

      <div className="flex flex-row gap-1 flex-wrap lg:flex-row justify-between items-baseline  my-2" >
        <div className="flex rounded-lg flex-row justify-between text-lg gap-1" role="group">
          <button className="bg-white text-blue-500 px-2 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
            <Typography>IMDB</Typography>
            <FaImdb />
          </button>
          <button className="bg-white text-blue-500 px-2 md:px-4  h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
            <Typography>Website</Typography>
            < FaExternalLinkAlt />
          </button>
          <button className="bg-white text-blue-500 px-2 md:px-4 h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
            <Typography>Trailer</Typography>
            < FaPlay />
          </button>
        </div>

        {/* back btn */}
        <button className="bg-white text-blue-500 px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg">
          &larr; Back
        </button>

      </div>




    </div>

  )
}

export default MovieInfo