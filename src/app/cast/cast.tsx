"use client";
import Button from "@/components/ui/button";
import Text from "@/components/ui/typography";
import { CastType } from "@/hooks/useGetPerson";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ClientCast = (person: CastType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [more, setMore] = useState(false);

  if (!searchParams.get("id")) {
    router.back();
  }

  return (
    <>
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
    </>
  );
};

export default ClientCast;
