import { Credits } from "@/types/newTypes";
import Text from "../ui/typography";
import Image from "next/image";
import Link from "next/link";

type Props = {
  credits: Credits;
};
export const Cast = ({ credits }: Props) => {
  return (
    <div>
      <Text size="h3" className="my-2">
        Cast
      </Text>
      <div className="grid grid-cols-3  gap-3 md:grid md:grid-cols-5  py-1">
        {credits &&
          credits?.cast?.slice(0, 5).map((actor) => {
            return (
              <div key={actor.id} className="flex flex-col">
                <div className="relative h-28 md:h-32">
                  <Image
                    className="rounded-md h-36 object-cover"
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/original/${actor?.profile_path}`
                        : "/images/placeholder.jpeg"
                    }
                    alt={actor.name}
                    fill
                    blurDataURL={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/original/${actor?.profile_path}`
                        : "/images/placeholder.jpeg"
                    }
                  />
                </div>
                <Link
                  href={{
                    pathname: "/cast",
                    query: { id: actor.id },
                  }}
                  // href={{
                  //   href: "/cas",
                  //   query: { id: actor.id },
                  // }}
                >
                  <Text
                    size="base"
                    className="truncate text-center hover:text-red-400 dark:hover:text-red-200"
                  >
                    {actor.name}{" "}
                  </Text>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Cast;
