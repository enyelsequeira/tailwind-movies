import Carrousel from "@/components/carrousel";
import Loader from "@/components/loader";
import Movie from "@/components/movie";
import MovieInfo from "@/components/movie/movie-info";
import Text from "@/components/ui/typography";
import {
  getExternalids,
  getShowInfo,
  getTvRecommendations,
} from "@/hooks/useGetShows";
import { IconMoodSadFilled } from "@tabler/icons-react";
import { Metadata } from "next";
import { Suspense } from "react";

type Params = {
  params: {
    show: string;
  };
};

const ShowInfoPage = async ({ params }: Params) => {
  const showInfo = await getShowInfo(Number(params.show));
  const res = await getExternalids(Number(params.show));
  const imdb_id = res.imdb_id;
  const recommendations = await getTvRecommendations(Number(params.show));

  const images = showInfo?.images?.posters.slice(0, 8);

  const showProps = {
    tagline: showInfo.tagline,
    runtime: showInfo.episode_run_time[0],
    homepage: showInfo.homepage,
    imdb_id,
    vote_average: showInfo.vote_average,
    vote_count: showInfo.vote_count,
    release_date: showInfo.first_air_date,
    overview: showInfo.overview,
    backdrop_path: showInfo.backdrop_path,
    poster_path: showInfo.poster_path,
    title: showInfo.name,
    spoken_languages: showInfo.spoken_languages,

    id: showInfo.id,
    videos: showInfo.videos,
    credits: showInfo.credits,
  };

  return (
    <div className="border min-h-screen grid lg:grid-cols-2 ">
      <Suspense fallback={<Loader />}>
        <Carrousel images={images} />
        <MovieInfo isShow={params.show} {...showProps} />
      </Suspense>
      <div className="lg:col-span-2 text-white mt-3 px-4 py-2">
        <Text size="h2" className="my-4 text-4xl  text-black dark:text-white">
          Recommendations
        </Text>
        <div className="grid lg:grid-cols-4 gap-3">
          {recommendations.length ? (
            <>
              {recommendations.map((movie) => {
                const Props = {
                  value: 1,
                  id: movie.id,
                  title: movie.name,
                  backdrop_path: movie.backdrop_path,
                  vote_average: movie.vote_average,
                };
                return <Movie key={movie.id} tvShows {...Props} />;
              })}
            </>
          ) : (
            <Text
              size="h1"
              className="py-4 text-center col-span-full flex flex-col items-center justify-center text-black dark:text-white"
            >
              NO SHOWS FOUND
              <IconMoodSadFilled className="dark:text-red-50 text-black" />
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowInfoPage;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const showInfo = await getShowInfo(Number(params.show));

  return {
    title: `Page of  ${showInfo?.name}`,
    description: `${showInfo?.overview}`,
  };
}
