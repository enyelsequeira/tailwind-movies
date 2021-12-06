import { FC, useState } from "react"
import { Shows } from "@/types/types"
import { useGetTopRatedShowsQuery } from "@/services/TMDB"
import Link from "next/link"
import Image from "next/image"
import { Typography } from "../ui"
import { Pagination } from ".."


interface Props {
  title: string
}
const ShowsBox: FC<Props> = ({ title }) => {
  const [page, setPage] = useState(1)

  const { data, error } = useGetTopRatedShowsQuery({ name: "top_rated", page })


  return (
    <div className="md:col-span-2 p-4 md:p-1 text-2xl font-bold flex flex-col">
      <Typography as="h4" className="md:col-span-3 font-semibold mb-4 md:my-4">{title}</Typography>

      <div className="grid grid-cols-2 gap-2 md:gap-1 md:grid-cols-3">
        {error && <Typography as="h2" className="col-span-3">Error could not load tv shows</Typography>}
        {data && data.results.slice(0, 6).map((d: Shows) => {
          return (
            <div className="flex flex-col justify-between" key={d.id}>
              <Image className="rounded-xl" width="100" height="100" src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`} alt={d.original_name} objectFit="cover" blurDataURL={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`} />
              <Link href={`/shows/${d.id}`} passHref>
                <Typography as="h6" className="truncate font-thin px-1 cursor-pointer hover:text-red-400 dark:hover:text-red-200" key={d.id}>
                  {d?.name}
                </Typography>
              </Link>
            </div>
          )
        })}
        {!error && <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />}

      </div>

    </div >
  )
}
export default ShowsBox