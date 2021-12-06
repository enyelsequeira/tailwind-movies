import { selectGenreOrCategory, searchMovie } from "@/features/currentGenreOrCategory/CurrentGenreOrCategory";
import { Genres } from "@/types/types";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarMenu } from "../menu-bar";
import Typography from "../ui/typography";
import Link from "next/link"
import { RootState } from "@/app/rootReducer";
import { RiMovie2Line } from "react-icons/ri"
import { Login } from "..";
import useWindowSize from "@/hooks/useWindowsSize";



interface Props {
  data?: Genres;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}
const FullNavigation: FC<Props> = ({ data, isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch()
  const { genreIdOrCategoryName, } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { width } = useWindowSize()



  useEffect(() => {
  }, [genreIdOrCategoryName])
  return (
    <div className={`sidebar z-50 bg-light-background-primary dark:bg-dark-background-secondary text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  md:relative md:translate-x-0 transition duration-200 ease-in-out overflow-auto  ${isMenuOpen || width > 768 ? "block " : "hidden"}`}>
      <div className="py-2 my-4">
        <Link href="/" passHref>
          <a onClick={() => dispatch(searchMovie(""))}>
            <RiMovie2Line className="w-14 h-14 mb-3 mx-auto fill-current text-red-400 dark:text-yellow-600 cursor-pointer hover:text-red-800 dark:hover:text-red-200 transition-all ease-in duration-300" />
          </a>
        </Link>

        {sidebarMenu.map((name, i) => {
          return (
            <Link href="/" key={i} passHref>
              <Typography as="h6" className="transition duration-500 ease-in-out cursor-pointer dark:text-white text-sm text-light-2 py-2 group-hover:text-light-3 group-hover:font-semibold hover:text-light-3 dark:hover:text-light-3" onClick={() => {
                dispatch(selectGenreOrCategory(name.value))
                dispatch(searchMovie(""))
                setIsMenuOpen(false)
              }}>
                {name.label}
              </Typography>

            </Link>
          )
        })}
      </div>
      <div className="border-t-4 border-dark-background-primary dark:border-light-background-secondary">
        <Typography as="h4" className="tracking-widest my-6 text-gray-500 uppercase dark:text-white font-title">Genres</Typography>
        <ul className="flex flex-col pt-5 space-y-8 ">
          {data?.genres.map(({ name, id }) => {
            return (
              <Link href="/" passHref key={id}>
                <li onClick={() => {
                  dispatch(selectGenreOrCategory(id))
                  dispatch(searchMovie(""))
                  setIsMenuOpen(false)
                }} className="flex items-center space-x-4 group">

                  <span
                    className="p-2 text-light  bg-light-accent rounded-xl group-hover:text-light-3 group-hover:bg-orange"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                  </span>
                  <Typography as="h6"
                    className="dark:text-white transition duration-500 ease-in-out font-body text-sm text-light-2 cursor-pointer group-hover:text-light-3 group-hover:font-semibold"
                  >
                    {name}
                  </Typography>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      <Login />

    </div>
  )

}

export default FullNavigation