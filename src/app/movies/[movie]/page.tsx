import { fetchMovieInfo } from "@/hooks/useMovieInfo";
import { Suspense } from "react";
import Loader from "@/components/loader";
import Carrousel from "@/components/carrousel";
import MovieInfo from "@/components/movie/movie-info";

export default async function Page({
  params,
}: {
  params: {
    movie: string;
  };
}) {
  const movieInfo = await fetchMovieInfo(Number(params.movie));
  const images = movieInfo?.images?.posters.slice(0, 8);

  return (
    <div className="border min-h-screen grid lg:grid-cols-2  lg:gap-x-2">
      <Suspense fallback={<Loader />}>
        <Carrousel images={images} />
        <Suspense fallback={<Loader />}>
          <MovieInfo movieInfo={movieInfo} />
        </Suspense>
      </Suspense>
    </div>
  );
}
