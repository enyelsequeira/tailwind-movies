import { MenuBar, TopBar } from "@/components";
import { FC, ReactNode, } from "react";
import { motion } from "framer-motion"


interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {


  return (
    <motion.div className="relative min-h-screen md:flex ">
      <MenuBar />
      <motion.div className="w-full">
        <TopBar />
        {children}
      </motion.div>
    </motion.div>


  )
}

export default Layout
