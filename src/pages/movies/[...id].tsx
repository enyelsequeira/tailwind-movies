import { useGetMovieImagesQuery, useGetMovieQuery, useGetRecommendationsQuery } from "@/services/TMDB"
import { GetServerSideProps } from 'next'
import { SingleResults } from "@/types/types"
import { Carrousel, Loader, Movie, MovieInfo, Recommended, } from "@/components"
import { Typography } from "@/components/ui"
import { useEffect } from "react"
import PageLayout from "@/layout/pages-layout"





const MovieInformation = ({ id }) => {



  const movieId = id.length > 1 ? id[1] : id[0]
  const { data, isLoading, error } = useGetMovieQuery({ id: movieId })
  const { data: imagesData, } = useGetMovieImagesQuery({ id: movieId })
  const { data: recommendations, } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: data?.id });


  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [movieId])




  return (
    <PageLayout seoProps={{ title: data ? data.title : "Next Movies", description: data ? data.overview : "Movie Overview" }}>
      {isLoading ? <Loader isInfo /> : (
        <>
          <Carrousel imagesData={imagesData} movieData={data} />
          <MovieInfo data={data} />
          <Recommended title="Recommended Movies">
            {recommendations && recommendations.results.length > 0 ? recommendations.results.slice(0, 12).map((movie: SingleResults, i) => {
              return (
                <Movie data={movie} key={i} value={i} />
              )
            }) : <div>Sorry No recommendation were found</div>}
          </Recommended>
        </>
      )}
      {error && <Typography> Sorry there was an error fetching data.. </Typography>}

    </PageLayout>
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



