import { useGetShows } from "@/hooks/useGetShows";
import { useState } from "react";
import Text from "../ui/typography";
import Link from "next/link";
import Pagination from "../pagination";
import Image from "next/image";

const Shows = () => {
  const [page, setPage] = useState(1);
  const { shows, isLoading, error } = useGetShows(page);
  console.log({ shows });
  return (
    <section className="col-span-full lg:col-span-2 border border-blue-500 px-2 w-full">
      <Text size="h4" className="md:col-span-2 font-semibold mb-4 md:my-4">
        Top Rated Shows
      </Text>
      <div className="lg:h-72 border border-orange-800 grid grid-cols-3 gap-x-2">
        {error && (
          <Text size="h2" className="col-span-3">
            Error could not load tv shows
          </Text>
        )}
        {shows &&
          shows.results.slice(0, 6).map((d) => {
            return (
              <div
                className="flex flex-col justify-between max-h-[124px]"
                key={d.id}
              >
                <Image
                  className="rounded-xl object-cover"
                  width="200"
                  height="200"
                  src={`https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path
                  }`}
                  alt={d.original_name}
                  blurDataURL={`https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path
                  }`}
                />
                <Link href={`/shows/${d.id}`} passHref legacyBehavior>
                  <Text
                    size="h5"
                    className="truncate font-thin px-1 cursor-pointer hover:text-red-400 dark:hover:text-red-200"
                    key={d.id}
                  >
                    {d?.name}
                  </Text>
                </Link>
              </div>
            );
          })}
        {!isLoading && (
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={shows?.total_pages}
          />
        )}
      </div>
    </section>
  );
};
export default Shows;
