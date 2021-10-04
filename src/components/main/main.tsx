
import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode,
  movie?: boolean
}


const Main: FC<Props> = ({ children, movie }): JSX.Element => {
  return (
    <div className={`flex flex-col md:grid md:grid-cols-6 md:gap-3 bg-[#F4F9FF] dark:bg-dark-background-primary ${movie ? " max-h-screen overflow-scroll no-scrollbar md:max-h-[220vh] lg:max-h-full" : ""}`}>
      {children}
    </div>

  )
}
export default Main