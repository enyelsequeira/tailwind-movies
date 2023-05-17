import Movie from "@/components/movie";
import { fetchMovies } from "@/hooks/useGetMovies";
import Head from "next/head";
import Link from "next/link";

type IndexPageProps = {
  searchParams: {
    page: string;
  };
  params: {
    genre: string;
  };
};
export default async function Page({
  params,
  searchParams: { page = "1" },
}: IndexPageProps) {
  const data = await fetchMovies(page, Number(params.genre));

  const pageUsed = typeof page === "string" && page === "" ? 1 : Number(page);

  return (
    <>
      <Head>
        <title>Movies with the Genre `${params.genre}`</title>
        <meta
          name="description"
          content="Movies with the Genre `${params.genre}`"
        >
          Movies with the Genre `${params.genre}` will be displayed here
        </meta>
      </Head>

      <div className="px-4 sm:px-6 lg:px-8  min-h-screen grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-x-3 lg:gap-y-6 py-2 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 ">
        {data &&
          data.results.map((movie) => (
            <Movie key={movie.id} tvShows={false} {...movie} />
          ))}
        <div className="md:col-span-4 col-span-2 mx-auto my-1 items-center">
          <ul className="flex space-x-2 items-center">
            {pageUsed === 1 ? null : (
              <Link
                href={`/genres/${params.genre}/?page=${pageUsed - 1}`}
                className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 dark:text-light-accent"
              >
                <svg className="w-4 h-4 fill-current " viewBox="0 0 20 20">
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </Link>
            )}

            <button className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline dark:text-light-accent">
              {pageUsed}
            </button>
            {data?.total_pages === pageUsed ? null : (
              <Link
                href={`/genres/${params.genre}/?page=${pageUsed + 1}`}
                className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 dark:text-light-accent"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
