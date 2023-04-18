import { useGetShows } from "@/hooks/useGetShows";
import { useState } from "react";
import Text from "../ui/typography";
import Link from "next/link";
import Pagination from "../pagination";
import Image from "next/image";

const Shows = () => {
  const [page, setPage] = useState(1);
  const { shows, isLoading, error } = useGetShows(page);
  return (
    <section className=" lg:col-span-2 flex flex-col">
      <Text size="h4" className="font-semibold mb-4 md:my-4">
        Top Rated Shows
      </Text>
      <div className="h-full">
        <div className="grid grid-cols-3 gap-4">
          {error ? (
            <Text size="h2" className="col-span-3">
              Error could not load tv shows
            </Text>
          ) : null}
          {shows &&
            shows?.results.slice(0, 6).map((d) => {
              return (
                <article
                  className="flex  h-[100px]  group relative rounded-md"
                  key={d.id}
                >
                  <Image
                    className="object-cover group-hover:opacity-70 transition-all duration-300 ease-in-out  rounded-md"
                    width={300}
                    height={200}
                    src={`https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`}
                    alt={d.original_name}
                    blurDataURL={`https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`}
                  />
                  <Link
                    href={`/shows/${d.id}`}
                    className="absolute inset-0 hidden group-hover:flex items-center justify-center mx-auto bg-black/75 text-white transition-all duration-300 ease-in-out  rounded-md "
                  >
                    <Text
                      size="h5"
                      className="truncate  px-1 cursor-pointer"
                      key={d.id}
                    >
                      {d?.name}
                    </Text>
                  </Link>
                </article>
              );
            })}
        </div>
        {!isLoading && (
          <div className="mt-4  mx-auto flex">
            <Pagination
              full
              currentPage={page}
              setPage={setPage}
              totalPages={shows?.total_pages}
            />
          </div>
        )}
      </div>
    </section>
  );
};
export default Shows;
