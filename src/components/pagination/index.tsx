import { FC } from "react"


interface Props {
  currentPage: any;
  setPage: any,
  totalPages: any
  full?: boolean
}


const Pagination: FC<Props> = ({ currentPage, setPage, totalPages, full }): JSX.Element => {

  return (
    <nav aria-label="Page navigation" className={`col-span-2 mx-auto my-1 ${full ? "md:col-span-4" : " md:col-span-3 "}`}>
      <ul className="inline-flex space-x-2">
        <li>
          <button onClick={(currentPage !== 1) ? () => setPage(((prevCurrentPage) => prevCurrentPage - 1)) : null} className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 dark:text-light-accent">
            <svg className="w-4 h-4 fill-current " viewBox="0 0 20 20">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd">
              </path>
            </svg>
          </button>
        </li>

        <li>
          <button className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline dark:text-light-accent">{currentPage}</button>
        </li>
        <li>
          <button className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 dark:text-light-accent" onClick={(currentPage !== totalPages) ? () => setPage(((prevCurrentPage) => prevCurrentPage + 1)) : null}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

