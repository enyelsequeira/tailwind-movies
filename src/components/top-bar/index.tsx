
import { FC } from "react";
import { DarkModeBtn, Search } from "..";

import { useSelector } from "react-redux";
import { userSelector } from "@/features/auth";

import Image from "next/image";
import Link from "next/link"
import { FiLogIn } from "react-icons/fi";
import { fetchToken } from "@/helpers";


const TopBar: FC = (): JSX.Element => {
  const { isAuthenticated, user } = useSelector(userSelector);


  return (
    <div className="col-span-10 flex  px-3 flex-col md:flex-row py-2 justify-between items-center ">

      <Search />

      <div className="flex justify-around md:justify-end w-full py-4  md:w-1/5 space-x-6">
        {isAuthenticated ? (
          <div className="relative object-cover w-6 h-auto">
            <Link href={`/profile/${user.id}`} passHref>
              <a>
                <Image className="rounded-full" objectFit="cover" layout="fill" alt="profile picture" blurDataURL={`https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`} src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`} />
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <FiLogIn onClick={fetchToken} className="cursor-pointer fill-current hover:text-red-900 dark:hover:text-red-200 transition-all duration-300 ease-linear w-5 h-auto" />
          </div>
        )}



        <DarkModeBtn />

      </div>

    </div>
  )
}

export default TopBar