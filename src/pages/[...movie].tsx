import { useGetMovieImagesQuery, useGetMovieQuery, useGetRecommendationsQuery } from "@/services/TMDB"
import { GetServerSideProps } from 'next'
import MovieImagesCarrousel from "@/components/movie-images-carrousel/movie-images-carrousel"
import SingleMovie from "@/components/movie/movie"
import MovieInfo from "@/components/movie-information/movie-information"
import Main from "@/components/main/main"
import Typography from "@/components/ui/typography"
import Layout from "@/layout"




const MovieInformation = ({ id }) => {
  const movieId = id.length > 1 ? id[1] : id[0]

  const { data, isLoading } = useGetMovieQuery({ id: movieId }, { refetchOnMountOrArgChange: true })
  const { data: imagesData, isLoading: isImagesLoading } = useGetMovieImagesQuery({ id: movieId })
  const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: data?.id });


  // TODO Combine these into just one
  if (isLoading) <p>my data is loading</p>
  if (isImagesLoading) <p>Images are loading</p>

  // console.log({ isLoading, isImagesLoading });




  return (
    <Layout>
      <Main movie>
        <MovieImagesCarrousel imagesData={imagesData} movieData={data} />
        <MovieInfo data={data} />
        {/* recommendations, is it needed a new component for it? */}
        <div className="flex flex-col pt-3 px-2 col-span-7">
          <Typography as="h2" className="my-2">Recommended Movies </Typography>
          <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-4  max-h-screen  md:max-h-[1200px] overflow-auto no-scrollbar  py-2">
            {recommendations ? recommendations.results.slice(0, 12).map((movie, i) => {
              return (
                <SingleMovie data={movie} key={i} />
              )
            }) : <div>Sorry No recommendation were found</div>}
          </div>
        </div>

      </Main>


    </Layout>
  )
}

export default MovieInformation


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.movie
    }
  }
}

