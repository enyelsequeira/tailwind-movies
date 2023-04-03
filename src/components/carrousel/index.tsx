"use client";
import { Poster } from "@/types/newTypes";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: Poster[];
};

const Carrousel = ({ images }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);

  const slideRight = () => {
    setIndex((index + 1) % images.length);
  };
  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    <div className=" border">
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {images?.map((image) => (
              <Tab
                key={image.file_path}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              >
                {({ selected }) => (
                  <>
                    <span className="sr-only"> {image.file_path} </span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      className={clsx(
                        selected ? "ring-indigo-500" : "ring-transparent",
                        "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
          {images?.map((image) => (
            <Tab.Panel key={image.file_path}>
              <img
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                alt={image.alt}
                className="h-full w-full object-cover object-center sm:rounded-lg"
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {/* {images?.length > 0 && (
        <div className="relative flex flex-col items-center  py-4 ">
          {images && images.length > 0 && (
            <Image
              alt={images?.[index].file_path}
              className="rounded-md shadow-2xl"
              src={
                images?.[index].file_path
                  ? `https://image.tmdb.org/t/p/original/${images?.[index].file_path}`
                  : "/images/placeholder.jpeg"
              }
              width="700"
              height="700"
            />
          )}

          <button
            onClick={slideLeft}
            className="absolute -left-1 top-[50%] bg-black/40 dark:bg-red-400 dark:text-black text-white p-1 rounded-2xl hover:bg-red-300  transition-all ease-in duration-300 dark:hover:bg-red-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </button>
          <button
            onClick={slideRight}
            className="absolute -right-1 top-[50%] bg-black/40 dark:bg-red-400 dark:text-black text-white p-1 rounded-2xl hover:bg-red-300  transition-all ease-in duration-300 dark:hover:bg-red-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-row gap-2 py-3">
        {images?.map((image, i) => {
          return (
            <div className={`relative w-[200px] ${images.classes}`} key={i}>
              <Image
                className={`${index === i ? "" : "opacity-50"} rounded-l`}
                src={
                  image?.file_path
                    ? `https://image.tmdb.org/t/p/original/${image.file_path}`
                    : image.placeholder
                }
                layout="fill"
                alt={`CoolImage${i}`}
                key={i}
                blurDataURL={
                  image?.file_path
                    ? `https://image.tmdb.org/t/p/original/${image.file_path}`
                    : image.placeholder
                }
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
export default Carrousel;
