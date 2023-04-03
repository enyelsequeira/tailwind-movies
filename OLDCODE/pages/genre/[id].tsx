import { useGetMovies } from "@/hooks/queries/useGetMovies";
import Layout from "@/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie, Pagination, Loader } from "@/components";

const Genre = () => {
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { movies, isLoading } = useGetMovies({
    page,
    genreId: Number(router.query.id),
  });
  useEffect(() => {
    setPage(1);
  }, [router.query.id]);
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 border min-h-screen grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-3 lg:gap-y-6 py-2 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 ">
        {isLoading ? (
          <div className="w-full col-span-full flex items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {movies &&
              movies.results.map((movie) => (
                <Movie key={movie.id} data={movie} />
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
    </Layout>
  );
};

export default Genre;
