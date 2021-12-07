import { searchMovie } from "@/features/currentGenreOrCategory/CurrentGenreOrCategory";
import { KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import { RootState } from "@/app/rootReducer";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

const Search = () => {
  const [query, setQuery] = useState("")
  const { searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const location = useRouter()

  const dispatch = useDispatch();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };
  // const onClickIcon = ()
  // console.log(searchQuery);

  useEffect(() => {
    // console.log(query)
    setQuery(searchQuery)
  }, [searchQuery])


  return (
    <div className="flex  border-dark-background-secondary dark:border-light-background-primary rounded-md w-full md:w-2/4 mt-14 md:mt-0">
      <input type="text" className="px-4 py-2 w-full  rounded-md" placeholder={location.pathname !== "/" ? "Can't search " : "Search Movie"} onKeyDown={handleKeyDown} disabled={location.pathname !== "/"} value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* <button className="flex items-center justify-center px-4 border-l" onClick={(e) => handleKeyDown(e)}>
        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        </svg>
      </button> */}
    </div>
  )
}

export default Search
