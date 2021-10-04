import DarkModeBtn from "@/components/dark-mode-btn";
import AppBar from "@/components/appbar";
import Navigation from "@/components/full-navigation";
import TopBar from "@/components/top-bar/top-bar";
import Container from "@/components/ui/container";
import { FC, ReactNode, } from "react";
import Main from "@/components/main/main";

interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {

  return (
    <div className="relative min-h-screen  md:flex">
      <AppBar />
      <div className="w-full">
        <TopBar />
        {/* <Main> */}
        {children}
        {/* </Main> */}
      </div>
    </div>


  )
}

export default Layout
