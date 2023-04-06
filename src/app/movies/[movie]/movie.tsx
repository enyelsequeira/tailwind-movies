import Carrousel from "@/components/carrousel";
import { useGetMovieInfo } from "@/hooks/useMovieInfo";

type Props = {
  params: {
    movie: string;
  };
};
export default function MovieInfo({ params: { movie } }: Props) {
  const { movieInfo } = useGetMovieInfo(Number(movie));
  console.log({ movieInfo: movieInfo?.images });
  // lets get the first 6 images onlye
  const images = movieInfo?.images?.posters.slice(0, 8);
  console.log({ images });

  return (
    <div className="border min-h-screen grid lg:grid-cols-2 ">
      <Carrousel images={images} />
      <div>INFO</div>
      <div className="col-span-full border border-red-400">RECOMENTED</div>
    </div>
  );
}
