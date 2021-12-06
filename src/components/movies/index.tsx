import { FC, useState, useEffect } from "react";

import { RootState } from "@/app/rootReducer";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "@/services/TMDB";
import { Loader, Movie, Pagination } from "..";
import { Typography } from "../ui";

import { SingleResults } from "@/types/types";

const Movies: FC = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    // console.log({ data, page, genreIdOrCategoryName });
  }, [page, genreIdOrCategoryName])


  return (
    <div className="font-bold col-span-7 flex flex-col border-black">
      <Typography as="h1" className="pl-3 mb-6">Movies</Typography>
      {isLoading && <Loader />}
      {error && <Typography as="h1">Sorry there was an error fetching movies</Typography>}

      <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-4  max-h-screen  md:max-h-[1200px] overflow-auto no-scrollbar  py-2">
        {data ? data.results.map((data: SingleResults, i: number) => {
          // console.log(i);
          return (
            <Movie data={data} key={i} value={i} />
          )
        }) : null}
      </div>

      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} full />

    </div>

  )
}
export default Movies
