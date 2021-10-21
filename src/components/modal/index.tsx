import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import { MdClose } from "react-icons/md"
import { Button, Typography } from "../ui";

interface Props {
  open?: () => null;
  setOpen?: () => null
  video?: any,
  title: string
}

const Modal = ({ open, title, video, setOpen }) => {
  const ref = useRef()
  useOnClickOutside(ref, () => setOpen(false))

  const toggle = () => {
    setOpen(!open)
  }
  return (
    <>
      <div

        className={open ? "flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/50 outline-none focus:outline-none justify-center items-center " : `hidden`}>
        <div className="relative  my-6 mx-auto max-w-4xl w-full ">
          {/* <!--content--> */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/* <!--header--> */}
            <div ref={ref} className="flex items-start  justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <Typography as="h2" className="text-gray-900">
                {/* TODO look at dark mode */}
                {title}
              </Typography>
              <Button variant="primary"
                onClick={toggle}
                className="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <MdClose />
                </span>
              </Button>
            </div>
            {/* <!--body--> */}
            <div className="relative flex-auto">
              <iframe className="w-3/4 h-[300px] md:h-[500px] py-10 mx-auto" frameBorder="0" title="Video Player" src={`https://www.youtube.com/embed/${video}`} allow="autoplay" />
            </div>
            {/* <!--footer--> */}
            <Button variant="secondary" resetStyles className="w-[fit-content] mx-auto my-4 bg-blue-600 text-white px-6 text-2xl rounded-md hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer"
              type="button" onClick={toggle}>
              Close
            </Button>

          </div>
        </div>
      </div>

    </>
  )
}

export default Modal