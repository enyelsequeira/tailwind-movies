import { useGetMovieImagesQuery, useGetMovieQuery, useGetRecommendationsQuery } from "@/services/TMDB"
import { GetServerSideProps } from 'next'
import Layout from "@/layout"
import { useRouter } from "next/router"
import { SingleResults } from "@/types/types"
import { Carrousel, Main, Movie, MovieInfo, Recommended } from "@/components"




const MovieInformation = ({ id }) => {
  const router = useRouter()


  // console.log(router.query.id, 'routes')
  const movieId = id.length > 1 ? id[1] : id[0]

  const { data, isLoading } = useGetMovieQuery({ id: movieId }, { refetchOnMountOrArgChange: true })
  const { data: imagesData, isLoading: isImagesLoading } = useGetMovieImagesQuery({ id: movieId })
  const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: data?.id });


  // TODO Combine these into just one
  if (isLoading) return <p>my data is loading</p>
  if (isImagesLoading) return <p>Images are loading</p>





  return (
    <Layout>
      <Main movie>
        <Carrousel imagesData={imagesData} movieData={data} />
        <MovieInfo data={data} />
        <Recommended title="Recommended Movies">
          {recommendations && recommendations.results.length > 0 ? recommendations.results.slice(0, 12).map((movie: SingleResults, i) => {
            return (
              <Movie data={movie} key={i} />
            )
          }) : <div>Sorry No recommendation were found</div>}
        </Recommended>
      </Main>


    </Layout>
  )
}


export default MovieInformation

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.id
    }
  }
}



