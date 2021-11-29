import { selectGenreOrCategory } from '@/features/currentGenreOrCategory/CurrentGenreOrCategory';
import useAuth from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from '..';




interface AlanProps {
  text: string;
  genre: string;
  command: string;
  genres: any;
}
const useAlanAi = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, user, logOut } = useAuth()


  useEffect(() => {
    const alanBtn = require('@alan-ai/alan-sdk-web');

    alanBtn({
      key: '2b4d51c596098c03255747fce375bd5a2e956eca572e1d8b807a3e2338fdd0dc/stage',

      onCommand: ({ text, genre, command, genres }: AlanProps) => {
        console.log({ text, genre, command, genres });
        if (command === 'chooseGenre') {
          const foundGenre = genres.find((gen) => gen.name.toLowerCase() === genre.toLowerCase());

          if (foundGenre) {
            router.push("/")
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else if (genre) {
            const parsedGenre = genre.startsWith('top') ? 'top_rated' : genre;

            dispatch(selectGenreOrCategory(parsedGenre));
          }
        } else if (command === 'please log me in') {
          if (!user) {
            fetchToken();
          } else {
            alert("you are already logged in")
          }
        } else if (command === "change Mode") {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }
      },

    })

  }, []);
}

export default useAlanAi;