import { Movie, MoviesResults } from "@/types/types";
import { FC, useState, useEffect } from "react";
import Pagination from "../pagination";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "@/services/TMDB";
import SingleMovie from "../movie/movie";
import { RootState } from "@/app/rootReducer";
import Typography from "../ui/typography";

interface Props {
  data: MoviesResults
}

const Movies: FC = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  // console.log(genreIdOrCategoryName);
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [page, genreIdOrCategoryName])

  if (isLoading) <p>Wait me</p>

  return (
    <div className="font-bold col-span-7 flex flex-col border-black">
      <Typography as="h1" className="pl-3 mb-6">Movies</Typography>
      <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-4  max-h-screen  md:max-h-[1200px] overflow-auto no-scrollbar  py-2">
        {data ? data.results.map((data: Movie, i: number) => {
          return (
            <SingleMovie data={data} key={i} />
          )
        }) : null}
      </div>

      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} full />

    </div>

  )
}
export default Movies
