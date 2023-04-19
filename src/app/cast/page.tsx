import {
  MovieWithCastResult,
  getMoviesWithPerson,
  getPersonInfo,
} from "@/hooks/useGetPerson";
import getQueryClient from "../getQueryClient";
import ClientCast from "./cast";
import Hydrate from "../hydrate-query";
import { dehydrate } from "@tanstack/react-query";
import Text from "@/components/ui/typography";
import Movie from "@/components/movie";
import { IconMoodSadFilled } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { Metadata } from "next";

const CastPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["person-info", Number(searchParams.id)],
    queryFn: async () => getPersonInfo(Number(searchParams.id)),
  });
  const dehydratedState = dehydrate(queryClient);
  let movieByPerson: MovieWithCastResult[];

  // I am not sure How I feel about this try catch block app dir is weird, but it works now
  try {
    movieByPerson = await getMoviesWithPerson(Number(searchParams.id));
  } catch (error) {
    redirect("/");
  }

  return (
    <div className="border min-h-screen grid lg:grid-cols-2  lg:gap-x-2">
      <Hydrate state={dehydratedState}>
        <Suspense fallback={<Loader />}>
          <ClientCast />
        </Suspense>
      </Hydrate>
      <section className="lg:col-span-2 text-white mt-3 px-4 py-2">
        <Text size="h2" className="my-4 text-4xl  text-black dark:text-white">
          Recommendations
        </Text>
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {movieByPerson?.length ? (
            <>
              {movieByPerson?.map((movie) => (
                <Movie key={movie.id} tvShows={false} {...movie} />
              ))}
            </>
          ) : (
            <Text
              size="h1"
              className="py-4 text-center col-span-full flex flex-col items-center justify-center text-black dark:text-white"
            >
              NO MOVIES FOUND
              <IconMoodSadFilled className="dark:text-red-50 text-black" />
            </Text>
          )}
        </div>
      </section>
    </div>
  );
};

export default CastPage;

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const data = await getPersonInfo(Number(searchParams.id));

  return {
    title: `Cast  ${data?.name}`,
    description: `Cast page where you will find information about ${data?.name} such as movies they have been in and more`,
  };
}
