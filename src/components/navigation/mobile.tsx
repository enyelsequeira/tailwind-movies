import { useGenres } from "@/hooks/queries/useGenres";
import clsx from "clsx";
import { IconCalendar, IconChevronRight, IconMovie } from "@tabler/icons-react";
import { sidebarMenu } from "../menu-bar";
import { Typography } from "../ui";
import Link from "next/link";

export const MobileNavigation = () => {
  const { genres } = useGenres();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-light-background-primary dark:bg-dark-background-secondary px-6 pb-4 ">
      <div className="flex h-16 shrink-0 items-center">
        <IconMovie className="w-14 h-14 flex mx-auto py-1" />
      </div>
      <nav className="flex flex-1 flex-col ">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {sidebarMenu.map((item) => (
                <li
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
              <Typography className="text-xl font-medium  tracking-widest my-6 text-gray-500 uppercase dark:text-white font-title">
                Genres
              </Typography>
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {genres?.map((genre) => (
                <Link
                  href={`/genre/${genre.id}`}
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
          <li className="mt-auto">
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
