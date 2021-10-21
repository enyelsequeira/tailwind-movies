
import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  children: ReactNode,
  movie?: boolean
}


const Main: FC<Props> = ({ children, movie }): JSX.Element => {
  const transition = { duration: 1, ease: "easeInOut" };


  const variants = {
    hidden: { opacity: 0, x: -200, y: -200 },
    enter: { opacity: 1, x: 0, y: [-100, -50, -25, 10, 0] },
    exit: { opacity: [.6, .4, 0], x: 0, y: -200 },
  }

  return (
    <AnimatePresence>

      <motion.div
        variants={variants} // Pass the variant object into Framer Motion 
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{
          type: 'tween',
          ease: 'linear', duration: 0.9
        }}
        className={`flex flex-col md:grid md:grid-cols-6 md:gap-3 bg-[#F4F9FF] dark:bg-dark-background-primary ${movie ? " max-h-screen overflow-scroll no-scrollbar md:max-h-[220vh] lg:max-h-full" : ""}`}>
        {children}
      </motion.div>
    </AnimatePresence>

  )
}
export default Main