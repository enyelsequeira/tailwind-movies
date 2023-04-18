"use client";

import useDebounce from "@/hooks/useDebouncedState";
import useSearch from "@/hooks/useSeach";
import { useRef, useState } from "react";
import { match } from "ts-pattern";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/ useOnClickOutside";

const SearchInput = () => {
  const [value, setValue] = useState<string>();

  const debouncedValue = useDebounce(value, 500);
  const { searchedMovies } = useSearch(debouncedValue as string);
  const ref = useRef(null);

  const handleSelectItem = () => {
    setValue("");
  };

  const handleClickOutside = () => {
    setValue("");
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="relative flex flex-1 max-w-full  mt-2">
      <div className="relative mt-1 w-full">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none  sm:text-sm">
          <input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none dark:bg-dark-background-primary dark:text-white"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            placeholder="Search..."
          />
          {value && value?.length > 0 && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={() => setValue("")}
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          )}
        </div>
        <>
          {value && value?.length > 0 && (
            <ul
              ref={ref}
              className="absolute mt-2  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm space-y-2 flex flex-col"
            >
              {searchedMovies?.results ? (
                <>
                  {searchedMovies?.results?.map((movie, i) => {
                    return (
                      <li
                        key={i}
                        value={i}
                        className={"px-2 text-base  text-black font-body py-1"}
                        onClick={handleSelectItem}
                      >
                        {match(movie)
                          .with({ media_type: "tv" }, () => (
                            <Link href={`/shows/${movie.id}`}>
                              {movie.name}
                            </Link>
                          ))
                          .with({ media_type: "movie" }, () => (
                            <Link href={`/movies/${movie.id}`}>
                              {movie.original_title}
                            </Link>
                          ))
                          .with({ media_type: "person" }, () => (
                            <Link
                              href={{
                                pathname: "/cast",
                                query: { id: movie.id },
                              }}
                            >
                              {movie.name}
                            </Link>
                          ))
                          .otherwise(() => (
                            <p>Nothing was found </p>
                          ))}
                      </li>
                    );
                  })}
                </>
              ) : (
                <div className="text-center py-2 font-bold font-title">
                  NO MOVIES TRY AGAIN
                </div>
              )}
            </ul>
          )}
        </>
      </div>
    </div>
  );
};

export default SearchInput;
