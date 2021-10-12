import { useState } from "react";
import { Typography } from "../ui";
import { FullNavigation, MobileNavigation } from "..";
// Hooks
import useWindowSize from "@/hooks/useWindowsSize";
import { useGetGenresQuery } from "@/services/TMDB";



const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TODO figure out what needs to be passed here
  const { data, isLoading } = useGetGenresQuery(null);



  const { width } = useWindowSize()
  const toggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (isLoading) <Typography>Loading data....</Typography>

  return (
    <>
      <div className="bg-gray-800  text-gray-100 flex justify-between w-full md:hidden">
        <a href="#" className="block p-4 text-white font-bold">MoviesE</a>
        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={toggle}>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className={`sidebar z-50 bg-light-background-primary dark:bg-dark-background-secondary text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  md:relative md:translate-x-0 transition duration-200 ease-in-out overflow-auto ${isMenuOpen ? "" : "-translate-x-full "}`}>
        {
          width < 768 ?
            <MobileNavigation data={data} /> : <FullNavigation data={data} />
        }


      </div>

    </>

  )
}

export default MenuBar

export const sidebarMenu = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
