import Layout from '@/layout'
import type { NextPage } from 'next'
import { useGetMoviesQuery } from '@/services/TMDB'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/rootReducer'
import { Hero, Main, Movies, ShowsBox } from '@/components'
import useAlanAi from '@/helpers/alan'
import { useEffect } from 'react'
import { selectGenreOrCategory } from '@/features/currentGenreOrCategory/CurrentGenreOrCategory'
import { fetchToken } from '@/helpers'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useRouter } from 'next/router'
import { useRef } from 'react'


const Home: NextPage = () => {
  const page = 1
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  // console.log(data);

  const movie = Math.floor(Math.random() * data?.results.length)
  useAlanAi();


  // const dispatch = useDispatch()
  // const router = useRouter()


  // useEffect(() => {
  //   alanBtn({
  //     key: '2b4d51c596098c03255747fce375bd5a2e956eca572e1d8b807a3e2338fdd0dc/stage',

  //     onCommand: ({ command, genre, genres, mode, query }) => {
  //       if (command === 'chooseGenre') {
  //         console.log("am i here", command, genre, genres, mode, query);
  //         const foundGenre = genres.find((gen) => gen.name.toLowerCase() === genre.toLowerCase());

  //         if (foundGenre) {
  //           router.push("/")
  //           dispatch(selectGenreOrCategory(foundGenre.id));
  //         } else if (genre) {
  //           const parsedGenre = genre.startsWith('top') ? 'top_rated' : genre;

  //           dispatch(selectGenreOrCategory(parsedGenre));
  //         }
  //       } else if (command === 'login') {
  //         fetchToken();
  //       }
  //     },

  //   })

  // }, []);


  return (
    <Layout>
      <Main>
        {isLoading ? <div> I am loading wait</div> : <Hero data={data.results[movie]} />}
        {error && <div>There was an error fetching data</div>}
        <ShowsBox title="Most Rated Shows" />
        <Movies />
      </Main>

    </Layout>
  )
}

export default Home
