import { MenuBar, TopBar } from "@/components";
import { FC, ReactNode, } from "react";
import { motion } from "framer-motion"
import useWindowSize from "@/hooks/useWindowsSize";


interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const { width } = useWindowSize()
  return (
    <motion.div className="relative md:flex border-2 border-red-50 ">
      <MenuBar />
      <motion.div className="w-full border-4 border-green-500">
        {width >= 768 && <TopBar />}
        {children}
      </motion.div>
    </motion.div>


  )
}

export default Layout
