import { Shows, ShowsResults } from "@/types/types"
import { FC, useState } from "react"
import Typography from "../ui/typography"
import Image from "next/image"
import Pagination from "../pagination"
import { useGetTopRatedShowsQuery } from "@/services/TMDB"


interface Props {
  title: string
}
const Sidebar: FC<Props> = ({ title }) => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTopRatedShowsQuery({ name: "top_rated", page })

  if (isLoading) <p>wait....</p>

  return (
    <div className="md:col-span-2 p-4 md:p-1 text-2xl font-bold flex flex-col">
      <Typography as="h4" className="md:col-span-3 font-semibold mb-4 md:my-4">{title}</Typography>

      <div className="grid grid-cols-2 gap-2 md:gap-1 md:grid-cols-3">
        {data?.results.slice(0, 6).map((d: Shows) => {
          return (
            <div className="flex flex-col justify-between" key={d.id}>
              <Image className="rounded-xl" width="100" height="100" src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`} alt={d.original_name} objectFit="cover" />
              <Typography as="h6" className="truncate font-thin px-1" key={d.id}>
                {d?.name}
              </Typography>
            </div>
          )
        })}
        <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
      </div>

    </div >
  )
}
export default Sidebar