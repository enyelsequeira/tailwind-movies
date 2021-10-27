import { RootState } from '@/app/rootReducer';
import { setUser, userSelector } from '@/features/auth';
import { fetchToken, getSessionId, moviesApi } from '@/helpers';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai"
import { BiLogOutCircle } from "react-icons/bi"

import Image from "next/image"
import { Typography } from '../ui';

const Login = () => {
  const { isAuthenticated, user, logOut } = useAuth()
  return (
    <div className="flex flex-col items-center space-y-9"  >
      {isAuthenticated && (
        <div>
          <Typography as="h6">{user.name}</Typography>
          <div className="relative object-cover w-20 h-20 mt-2 mx-auto">
            <Image className="rounded-full" objectFit="cover" layout="fill" alt="profile picture" blurDataURL={`https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`} src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`} />
          </div>
        </div>
      )}

      {!isAuthenticated ? <button className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded inline-flex items-center text-black " onClick={fetchToken}>
        <AiOutlineLogin className="fill-current w-8 h-8 mr-2" />
        <span>Login</span>
      </button> : <button className="bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded inline-flex items-center text-black " onClick={logOut}>
        <BiLogOutCircle className="fill-current w-8 h-8 mr-2" />
        <span>LogOut</span>
      </button>}

    </div>
  )
}

export default Login
