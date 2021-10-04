import Hero from '@/components/hero/hero'
import Main from '@/components/main/main'
import Sidebar from '@/components/sidebar/sidebar'
import Layout from '@/layout'
import type { NextPage } from 'next'
import Movies from '@/components/movies/movies'
import { useGetMoviesQuery } from '@/services/TMDB'
import { useSelector } from 'react-redux'
import Typography from '@/components/ui/typography'
import { RootState } from '@/app/rootReducer'


const Home: NextPage = () => {
  const page = 1
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const movie = Math.floor(Math.random() * data?.results.length)
  return (
    <Layout>
      <Main>
        <Hero data={data?.results[movie]} />
        <Sidebar title="Most Rated Shows" />
        <Movies />
      </Main>
    </Layout>
  )
}

export default Home
