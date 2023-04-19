"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
  IconX,
} from "@tabler/icons-react";
import Text from "../ui/typography";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const ButtonIcons =
  "inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";
export default function SignInModal({ open, setOpen }: Props) {
  const [input, setInput] = useState("");

  const schema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
  });

  const validateInput = async () => {
    try {
      const data = schema.parse({ email: input });
      await signIn("email", {
        email: data.email,
      });
    } catch (error: any) {
      toast.error(error.issues[0].message || error.message, {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
  };

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
          <div className="fixed inset-0 w-full z-auto bg-gray-800 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full w-full justify-center p-2 md:p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full  max-w-xs   lg:max-w-md pb-2">
                <div className="flex items-start  justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <Dialog.Title as={Text} size="h2" className="text-gray-900">
                    SIGNIN
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
                <div className="px-4 pb-3">
                  <div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button
                        className={ButtonIcons}
                        onClick={() => signIn("google")}
                      >
                        <IconBrandGoogle />
                      </Button>

                      <Button
                        className={ButtonIcons}
                        onClick={() => signIn("github")}
                      >
                        <IconBrandGithub />
                      </Button>
                    </div>

                    {/* <div className="relative mt-6">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="mt-6">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validateInput();
                      }}
                      id="form"
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            // disabled
                            placeholder="WORK IN PROGRESS"
                            // type="email"
                            // autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 dark:bg-dark-background-primary dark:text-white"
                            onChange={(e) => setInput(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          // disabled
                          form="form"
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-600/30"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>
                {/* MORE CONTENT COPULD GO HERE */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
