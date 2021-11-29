import { selectGenreOrCategory } from '@/features/currentGenreOrCategory/CurrentGenreOrCategory';
import alanBtn from '@alan-ai/alan-sdk-web';
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
  //check if window if undefined

  useEffect(() => {
    if (typeof window === 'undefined') return null

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
        } else if (command === 'login') {
          fetchToken();
        }
      },

    })

  }, []);
}

export default useAlanAi;
