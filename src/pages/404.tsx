import Link from "next/link";
import { Typography } from "../components/ui";

export default function Page404() {
  return (
    <div className="flex  items-center justify-center w-full md:w-screen min-h-screen bg-gradient-to-r from-indigo-600 to-blue-400 ">
      <div className="px-2 md:px-40 py-20 bg-white rounded-md shadow-xl ">
        <div className="flex flex-col items-center">
          <Typography as="h1" className="font-bold text-blue-600 text-9xl">404</Typography>

          <Typography as="h5" className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <Typography as="span" className="text-red-500">Oops!</Typography> Page not found
          </Typography>

          <Typography as="p" className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </Typography>

          <Link href="/">
            <a
              href="#"
              className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >Go home</a
            >
          </Link>

        </div>
      </div>
    </div>
  );
}

