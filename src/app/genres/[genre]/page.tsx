"use client";

import Loader from "@/components/loader";
import Movie from "@/components/movie";
import Pagination from "@/components/pagination";
import { useGetMovies } from "@/hooks/useGetMovies";
import { useState } from "react";

export default function Page({ params }) {
  const [page, setPage] = useState(1);

  const { movies, isLoading } = useGetMovies({
    page,
    genreId: Number(params.genre),
  });
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 border min-h-screen grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-3 lg:gap-y-6 py-2 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 ">
        {isLoading ? (
          <div className="w-full col-span-full flex items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {" "}
            {movies &&
              movies.results.map((movie) => (
                <Movie key={movie.id} tvShows={false} {...movie} />
              ))}
          </>
        )}
        {!isLoading && (
          <Pagination
            full
            currentPage={page}
            totalPages={movies?.total_pages}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
