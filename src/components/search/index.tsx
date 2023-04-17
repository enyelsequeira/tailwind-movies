"use client";

import useDebounce from "@/hooks/useDebouncedState";
import useSearch from "@/hooks/useSeach";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Combobox, Transition } from "@headlessui/react";
import { match, P } from "ts-pattern";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchInput = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, 500);
  const { searchedMovies } = useSearch(debouncedValue as string);

  console.log({ searchedMovies });

  return (
    <div className="relative flex flex-1 max-w-full border mt-2">
      <Combobox value={value} onChange={setValue}>
        <div className="relative mt-1 w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none  sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
              onChange={(event) => setValue(event.target.value)}
              placeholder="Search..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setValue("")}
          >
            <Combobox.Options className="absolute mt-2  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchedMovies?.results ? (
                <>
                  {searchedMovies?.results?.map((movie, i) => {
                    return (
                      <Combobox.Option key={i} value={i}>
                        {match(movie)
                          .with({ media_type: "tv" }, () => <p>{movie.name}</p>)
                          .with({ media_type: "movie" }, () => (
                            <p>{movie.original_title}</p>
                          ))
                          .with({ media_type: "person" }, () => (
                            <p>{movie.name}</p>
                          ))
                          .otherwise(() => (
                            <p>Nothing was found </p>
                          ))}
                      </Combobox.Option>
                    );
                  })}
                </>
              ) : (
                <div>NO MOVIES TRY AGAIN</div>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>

    // <form className="relative flex flex-1">
    //   <label htmlFor="search-field" className="sr-only">
    //     Search
    //   </label>
    // <MagnifyingGlassIcon
    //   className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
    //   aria-hidden="true"
    // />
    //   <input
    //     onChange={(e) => {
    //       setValue(e.target.value);
    //     }}
    //     className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
    //     placeholder="Search..."
    //     // {...register("search")}
    //   />
    // </form>
  );
};

export default SearchInput;
