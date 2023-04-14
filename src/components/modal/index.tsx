"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import Text from "../ui/typography";
import Button from "../ui/button";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef: any;
  movie: {
    title: string;
    video: string;
    id: number;
  };
};
export default function Modal({ open, setOpen, movie }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 w-full z-auto bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-4xl pb-2">
                <div className="flex items-start  justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <Dialog.Title as={Text} size="h2" className="text-gray-900">
                    {movie.title}
                  </Dialog.Title>
                  <Button
                    variant="primary"
                    onClick={() => setOpen(false)}
                    className="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <IconX />
                    </span>
                  </Button>
                </div>
                <div className="relative flex-auto">
                  <iframe
                    className="w-3/4 h-[300px] md:h-[500px] py-10 mx-auto"
                    frameBorder="0"
                    title="Video Player"
                    src={`https://www.youtube.com/embed/${movie.video}`}
                    allow="autoplay"
                  />
                </div>
                <Button
                  variant="secondary"
                  className="w-[fit-content] mx-auto my-4 bg-blue-600 text-white px-6 text-2xl rounded-md hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer "
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
