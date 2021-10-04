import { FC } from "react";
import DarkModeBtn from "../dark-mode-btn";

const TopBar: FC = (): JSX.Element => {
  return (
    <div className="col-span-10 flex  px-3 flex-col md:flex-row py-2 justify-between items-center">
      <div className="flex border border-dark-background-secondary dark:border-light-background-primary rounded-md w-full md:w-2/4">
        <input type="text" className="px-4 py-2 w-full  rounded-md" placeholder="Search Movies" />
        <button className="flex items-center justify-center px-4 border-l">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
      {/* <input className="w-full md:w-2/4 h-[fit-content] mx-0 md:mx-auto bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="search movies" /> */}
      <div className="flex justify-around md:justify-end w-full py-4  md:w-1/5" >
        <button className="block focus:outline-none focus:bg-gray-700 md:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </button>
        <DarkModeBtn />

      </div>

    </div>
  )
}

export default TopBar