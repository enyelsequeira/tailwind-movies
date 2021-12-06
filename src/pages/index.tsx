import type { NextPage } from 'next'
import { useGetMoviesQuery } from '@/services/TMDB'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/rootReducer'
import { Hero, Movies, ShowsBox } from '@/components'
import PageLayout from '@/layout/pages-layout'
import useAlanAi from '@/helpers/alan'



const Home: NextPage = () => {
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isLoading } = useGetMoviesQuery({ genreIdOrCategoryName, page: 1, searchQuery });

  const movie = Math.floor(Math.random() * data?.results.length)
  useAlanAi();

  return (
    <PageLayout seoProps={{ title: "Home page of the movie app", description: "Home page where you can choose what to watch and search, don't know what your're looking for? try and just click a category" }}>
      {isLoading ? <div> I am loading wait</div> : <Hero data={data?.results[movie]} />}
      {error && <div>There was an error fetching data</div>}
      <ShowsBox title="Most Rated Shows" />
      <Movies />
    </PageLayout>
  )
}

export default Home
