import { getMoviesWithPerson, getPersonInfo } from "@/hooks/useGetPerson";
import ClientCast from "./cast";
import Carrousel from "@/components/carrousel";
import Text from "@/components/ui/typography";
import Movie from "@/components/movie";
import { IconMoodSadFilled } from "@tabler/icons-react";

const CastPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const personInfo = await getPersonInfo(Number(searchParams.id));
  const moviesByPerson = await getMoviesWithPerson(Number(searchParams.id));
  if (!searchParams.id) {
  }
  return (
    <div className="border min-h-screen grid lg:grid-cols-2  lg:gap-x-2">
      <Carrousel images={personInfo?.images?.profiles} />
      <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
        <Text size="h3" className="md:tracking-wider text-center">
          {personInfo?.name}
        </Text>
        <Text size="h4" className="tracking-wide my-2">
          {" "}
          {personInfo?.birthday}{" "}
        </Text>
        <Text size="h4" className="tracking-wide my-2">
          Born: {personInfo?.place_of_birth}{" "}
        </Text>

        <ClientCast {...personInfo} />
      </div>
      <section className="lg:col-span-2 text-white mt-3 px-4 py-2">
        <Text size="h2" className="my-4 text-4xl  text-black dark:text-white">
          Recommendations
        </Text>
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {moviesByPerson.length ? (
            <>
              {moviesByPerson.map((movie) => (
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
