"use client";
import Hero from "@/components/hero";
import Loader from "@/components/loader";
import Movie from "@/components/movie";
import Pagination from "@/components/pagination";
import Shows from "@/components/shows";
import Text from "@/components/ui/typography";
import { useGetTest } from "@/hooks/useGetHomePage";
import useCategoriesStore, {
  usePaginationStore,
} from "@/store/useCategoriesStore";

const InitialPage = () => {
  const { initialPage, isLoading } = useGetTest();
  const category = useCategoriesStore((state) => state.categories);
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setPage = usePaginationStore((state) => state.setPage);

  const handlePageChange = (
    newPage: number | ((prevPage: number) => number)
  ) => {
    if (typeof newPage === "function") {
      setPage((prevPage) => newPage(prevPage));
    } else {
      setPage(() => newPage);
    }
  };

  const movie = Math.floor(Math.random() * initialPage?.results.length);

  return (
    <div className="px-4 sm:px-6 lg:px-8 border min-h-screen lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-3 lg:gap-y-6 py-2  gap-y-4  sm:gap-x-6 sm:gap-y-10 md:flex-col  flex flex-col">
      {isLoading ? (
        <div className="w-full col-span-full flex items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <section className="col-span-full w-full border-4 border-green-400 grid grid-cols-5 gap-x-3">
            <Hero data={initialPage?.results[movie]} />
            <Shows />
          </section>
          <div className="border-red-500 border-4 col-span-full">
            <Text size="h1" className="uppercase">
              {/* lazy check  */}
              {category === "top_rated" ? "Top Rated" : category} Movies
            </Text>
          </div>
          {initialPage?.results.map((movie) => (
            <Movie key={movie.id} data={movie} />
          ))}
          {!isLoading && (
            <Pagination
              full
              currentPage={currentPage}
              totalPages={initialPage?.total_pages}
              setPage={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InitialPage;
