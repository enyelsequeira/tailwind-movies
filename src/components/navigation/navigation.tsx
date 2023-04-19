"use client";

import { IconCalendar, IconChevronRight, IconMovie } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { useGenres } from "@/hooks/useGenres";
import { sidebarMenu } from "@/constants";
import { Categories } from "@/hooks/useGetHomePage";
import useCategoriesStore, {
  usePaginationStore,
} from "@/store/useCategoriesStore";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const setCategory = useCategoriesStore((state) => state.setCategory);
  const setPage = usePaginationStore((state) => state.setPage);
  const router = useRouter();
  const { genres } = useGenres();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col ">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-light-background-primary dark:bg-dark-background-secondary px-6 pb-4 no-scrollbar">
        <Link
          href="/"
          aria-label="go home"
          className="flex h-16 shrink-0 items-center mt-2"
        >
          <IconMovie className="w-14 h-14 flex mx-auto py-1" />
        </Link>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="link" className="space-y-1">
                {sidebarMenu.map((item) => (
                  <li
                    onClick={async () => {
                      router.push("/");
                      setCategory(item.value as Categories);
                      setPage(() => 1);
                    }}
                    key={item.label}
                    className={clsx(
                      "text-sm font-base font-title dark:text-white text-black transition duration-500 ease-in-out cursor-pointer   text-light-2 py-2 hover:font-semibold hover:text-dark-2 dark:hover:text-light-3"
                    )}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div>
                <p className="text-xl font-medium  tracking-widest my-6 text-gray-500 uppercase dark:text-white font-title">
                  Genres
                </p>
              </div>
              <ul role="link" className="-mx-2 mt-2 space-y-1">
                {genres?.map((genre) => (
                  <Link
                    role="link"
                    scroll={true}
                    href={`/genres/${genre.id} `}
                    key={genre.name}
                    className={"group flex gap-x-3 p-2 "}
                  >
                    <IconChevronRight className="p-1 text-light bg-light-accent rounded-xl group-hover:text-dark group-hover:bg-orange" />
                    <span className=" font-title dark:text-white text-black  transition duration-500 ease-in-out  text-sm text-light-2 cursor-pointer group-hover:text-dark-2 group-hover:font-semibold dark:hover:text-light-3">
                      {genre.name}
                    </span>
                  </Link>
                ))}
              </ul>
            </li>
            {/* <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-black"
              >
                <IconCalendar
                  className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                  aria-hidden="true"
                />
                Settings
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
