"use client";

import clsx from "clsx";
import { IconCalendar, IconChevronRight, IconMovie } from "@tabler/icons-react";
import Link from "next/link";
import { sidebarMenu } from "@/constants";
import { useGenres } from "@/hooks/useGenres";
import useCategoriesStore, {
  usePaginationStore,
} from "@/store/useCategoriesStore";
import { useRouter } from "next/navigation";
import { Categories } from "@/hooks/useGetHomePage";
import { Dispatch, SetStateAction } from "react";
type Props = {
  closeDrawer: Dispatch<SetStateAction<boolean>>;
};
export const MobileNavigation = ({ closeDrawer }: Props) => {
  const { genres } = useGenres();
  const setCategory = useCategoriesStore((state) => state.setCategory);
  const setPage = usePaginationStore((state) => state.setPage);
  const router = useRouter();

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
                  onClick={async () => {
                    router.push("/");
                    setCategory(item.value as Categories);
                    setPage(() => 1);
                    closeDrawer(false);
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
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {genres?.map((genre) => (
                <Link
                  href={`/genres/${genre.id}`}
                  key={genre.name}
                  className={"group flex gap-x-3 p-2 "}
                  onClick={() => {
                    closeDrawer(false);
                  }}
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
