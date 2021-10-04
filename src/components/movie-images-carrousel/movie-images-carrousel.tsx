import { useState } from "react"
import Image from "next/image"
import { FC } from "hoist-non-react-statics/node_modules/@types/react"
import { ImagesResults, MovieInformation } from "@/types/types"


interface Props {
  imagesData: ImagesResults,
  movieData: MovieInformation
}

const MovieImagesCarrousel: FC<Props> = ({ imagesData, movieData }): JSX.Element => {
  const [index, setIndex] = useState(0)
  const allImages = imagesData?.backdrops.slice(0, 6)

  const slideRight = () => {
    setIndex((index + 1) % allImages.length)
  }
  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(allImages?.length - 1)
    } else {
      setIndex(nextIndex)
    }
  }

  return (
    <div className="md:col-span-6 lg:col-span-3 px-3 pt-6 md:flex md:flex-col md:justify-center  ">
      {allImages?.length > 0 && (
        <div className="relative flex flex-col items-center  py-4 ">
          <Image className="rounded-md shadow-2xl" src={`https://image.tmdb.org/t/p/original/${allImages[index].file_path}`} width="700" height="700" objectFit="cover" alt={movieData?.title} />
          <button onClick={slideLeft} className="absolute -left-1 top-[50%] bg-black/40 dark:bg-red-400 dark:text-black text-white p-1 rounded-2xl hover:bg-red-300  transition-all ease-in duration-300 dark:hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
          </button>
          <button onClick={slideRight} className="absolute -right-1 top-[50%] bg-black/40 dark:bg-red-400 dark:text-black text-white p-1 rounded-2xl hover:bg-red-300  transition-all ease-in duration-300 dark:hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-row gap-2 py-3">
        {allImages?.map((image, i) => {
          return (
            <div className="relative w-[200px]  h-[50px] md:h-[80px]" key={i}>
              <Image className={`${index === i ? "" : "opacity-50"} rounded-l`}
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`} layout="fill" alt={`CoolImage${i}`} key={i} />
            </div>

          )
        })}
      </div>
    </div>
  )
}
export default MovieImagesCarrousel






