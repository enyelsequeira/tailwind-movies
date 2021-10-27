import Layout from '@/layout'
import type { NextPage } from 'next'
import { useGetMoviesQuery } from '@/services/TMDB'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/rootReducer'
import { Hero, Main, Movies, ShowsBox } from '@/components'


const Home: NextPage = () => {
  const page = 1
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  // console.log(data);

  const movie = Math.floor(Math.random() * data?.results.length)
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
