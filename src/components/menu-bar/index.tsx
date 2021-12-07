import { useState, useEffect } from "react";
import { Typography } from "../ui";
import { DarkModeBtn, FullNavigation, Loader, Search } from "..";
// Hooks
import { useGetGenresQuery } from "@/services/TMDB";

import Link from "next/link";
import { Fragment } from "react";



const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data, isLoading, error } = useGetGenresQuery(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])



  const toggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (isLoading) return <Loader />
  if (error) return <Typography as="h3">sorry could not load genres</Typography>





  return (
    <Fragment>
      <div className={`bg-gray-800 grid grid-cols-3 gap-2 justify-between items-center pb-4 w-full md:hidden h-[fit-content] ${scrollPosition !== 0 ? "bg-red-100 z-50 text-black dark:bg-white" : "text-gray-100"}`}>
        <Link href="/">
          <a className="block p-4 font-bold">MoviesE</a>
        </Link>
        <DarkModeBtn />
        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700 col-start-3 flex justify-end " onClick={toggle}>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="col-span-3 flex items-center justify-evenly ">
          <Search mobile />
        </div>
      </div>



      <FullNavigation data={data} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />


    </Fragment>

  )
}

export default MenuBar

export const sidebarMenu = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
