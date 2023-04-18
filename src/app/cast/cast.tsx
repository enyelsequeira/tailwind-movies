"use client";
import Carrousel from "@/components/carrousel";
import Button from "@/components/ui/button";
import Text from "@/components/ui/typography";
import { usePersonInfo } from "@/hooks/useGetPerson";
import { Poster } from "@/types/newTypes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ClientCast = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [more, setMore] = useState(false);

  const id = searchParams?.get("id");
  const { person } = usePersonInfo(Number(id));
  const images = person?.images.profiles.slice(0, 8);

  if (!searchParams?.get("id")) {
    router.back();
  }

  return (
    <>
      <Carrousel images={images as Poster[]} />
      <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
        <Text size="h3" className="md:tracking-wider text-center">
          {person?.name}
        </Text>
        <Text size="h4" className="tracking-wide my-2">
          {" "}
          {person?.birthday}{" "}
        </Text>
        <Text size="h4" className="tracking-wide my-2">
          Born: {person?.place_of_birth}{" "}
        </Text>

        <div className="space-y-3">
          <Text as="p" className={more ? "line-clamp-none" : "line-clamp-6"}>
            {person?.biography}
          </Text>
          <Button
            variant="secondary"
            onClick={() => setMore(!more)}
            className="p-2 rounded-xl"
          >
            {more ? "Less" : "More"} &rarr;{" "}
          </Button>
        </div>
        <div className="flex mt-4 w-full space-x-2">
          <a
            className="bg-white text-blue-500 px-2 md:px-4  h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary"
            target="_blank"
            href={`https://www.imdb.com/name/${person?.imdb_id}`}
            rel="noreferrer"
          >
            &rarr; IMDB
          </a>
          <Button variant="secondary" onClick={() => router.back()}>
            &larr; Back{" "}
          </Button>
        </div>
      </div>{" "}
    </>
  );
};

export default ClientCast;
