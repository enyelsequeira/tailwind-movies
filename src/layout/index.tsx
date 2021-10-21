import { MenuBar, TopBar } from "@/components";
import { FC, ReactNode, } from "react";
import { AnimateSharedLayout, motion } from "framer-motion"


interface Props {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const transition = { duration: 1, ease: "easeInOut" };

  // const pageTransition = {
  //   initial: { opacity: 0 },
  //   enter: { opacity: 1, transition },
  //   exit: { opacity: 0, transition }
  // };

  return (
    <motion.div className="relative min-h-screen  md:flex">
      <MenuBar />
      <motion.div className="w-full">
        <TopBar />
        {children}
      </motion.div>
    </motion.div>


  )
}

export default Layout
