import { Genre } from "@/types/newTypes";
import Text from "../ui/typography";
import Link from "next/link";

type Props = {
  genres?: Genre[];
};
const Genres = ({ genres }: Props) => {
  return (
    <>
      {genres ? (
        <div>
          <Text size="h3" className="my-2">
            Genres
          </Text>
          <div className="flex space-x-4">
            {genres.map((genre) => {
              return (
                <Link href={`/genres/${genre.id}`} passHref key={genre.id}>
                  <Text
                    as="p"
                    className="hover:text-red-400 dark:hover:text-red-200"
                  >
                    {genre.name}{" "}
                  </Text>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Genres;
