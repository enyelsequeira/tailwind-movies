import { searchMovie } from "@/features/currentGenreOrCategory/CurrentGenreOrCategory";
import { FormEventHandler, KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import { FC } from "react";
import { RootState } from "@/app/rootReducer";

import { useDispatch, useSelector } from "react-redux";
import DarkModeBtn from "../dark-mode-btn";
import { useRouter } from "next/router";
import Search from "../search";


const TopBar: FC = (): JSX.Element => {


  return (
    <div className="col-span-10 flex  px-3 flex-col md:flex-row py-2 justify-between items-center">

      <Search />

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