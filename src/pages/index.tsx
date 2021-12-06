import Layout from '@/layout'
import type { NextPage } from 'next'
import { useGetMoviesQuery } from '@/services/TMDB'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/rootReducer'
import { Hero, Movies, ShowsBox } from '@/components'
import PageLayout from '@/layout/pages-layout'
import useAlanAi from '@/helpers/alan'



const Home: NextPage = () => {
  const page = 1
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  // console.log(data);

  const movie = Math.floor(Math.random() * data?.results.length)
  useAlanAi();

  return (
    <PageLayout seoProps={{ title: "My home page is here", description: "the home page of tailwind/next movies" }}>
      {isLoading ? <div> I am loading wait</div> : <Hero data={data.results[movie]} />}
      {error && <div>There was an error fetching data</div>}
      <ShowsBox title="Most Rated Shows" />
      <Movies />
    </PageLayout>
  )
}

export default Home
