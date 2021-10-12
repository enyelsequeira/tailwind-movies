import { MenuBar, TopBar } from "@/components";
import { FC, ReactNode, } from "react";

interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {

  return (
    <div className="relative min-h-screen  md:flex">
      <MenuBar />
      <div className="w-full">
        <TopBar />
        {children}
      </div>
    </div>


  )
}

export default Layout
