"use client";
import Hero from "@/components/hero";
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

  const movie =
    initialPage && Math.floor(Math.random() * initialPage?.results?.length);

  return (
    <div>
      <div className="grid md:grid-cols-1 lg:grid-cols-5 lg:gap-x-4">
        <Hero data={initialPage?.results[movie || 1]} />
        <Shows />
      </div>
      <Text size="h1" className="uppercase my-2 px-2">
        {/* lazy check  */}
        {category === "top_rated" ? "Top Rated" : category} Movies
      </Text>
      <div className="flex flex-col  md:grid md:grid-cols-2  xl:grid-cols-4 gap-4 px-2">
        {initialPage?.results.map((movie) => (
          <Movie key={movie.id} tvShows={false} {...movie} />
        ))}
        {!isLoading && (
          <Pagination
            full
            currentPage={currentPage}
            totalPages={initialPage?.total_pages}
            setPage={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default InitialPage;
