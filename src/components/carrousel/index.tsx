"use client";
import { Poster } from "@/types/newTypes";
import { Tab } from "@headlessui/react";
import Image from "next/image";

type Props = {
  images: Poster[];
};

const Carrousel = ({ images }: Props): JSX.Element => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse pt-2 lg:pt-1">
      {/* Image selector */}
      <div className="mx-auto mt-2  w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-3 px-2">
          {images?.map((image) => (
            <Tab
              key={image.file_path}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
            >
              <>
                <span className="sr-only"> {image.file_path} </span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <Image
                    width={500}
                    height={500}
                    src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                    alt={image.file_path}
                    className="h-full w-full object-cover object-center"
                  />
                </span>
              </>
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
        {images?.map((image) => (
          <Tab.Panel key={image.file_path}>
            <Image
              width={500}
              height={500}
              src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
              alt={image.file_path}
              className="object-cover object-center  rounded-xl h-[400px] md:h-[500px] lg:h-[675px] flex  mx-auto"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
export default Carrousel;
