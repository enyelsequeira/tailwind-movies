import getQueryClient from "@/app/getQueryClient";
import { fetchMovieInfo } from "@/hooks/useMovieInfo";
import MovieInfo from "./movie";

export default async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movie-info", params.movie],
    queryFn: () => fetchMovieInfo(params.movie),
  });

  return (
    <div>
      <MovieInfo params={params} />
    </div>
  );
}
