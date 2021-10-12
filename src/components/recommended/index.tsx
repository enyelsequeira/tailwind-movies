import { FC, ReactNode } from "react"
import { Typography } from "../ui"


interface Props {
  children: ReactNode,
  title?: string
}
const Recommended: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col pt-3 px-2 col-span-7">
      <Typography as="h2" className="my-2">{title} </Typography>
      <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-4  max-h-screen  md:max-h-[1200px] overflow-auto no-scrollbar  py-2">
        {children}
      </div>
    </div>
  )
}
export default Recommended