import { Carrousel, Main, Movie, MovieInfo, Recommended } from "@/components"
import Layout from "@/layout"
import { useGetTvShowsAllInformationQuery } from "@/services/TMDB"
import { SingleResults } from "@/types/types"
import { GetServerSideProps } from "next"

const Shows = ({ id }: { id: string }) => {
  const { data: tvShowsImages } = useGetTvShowsAllInformationQuery({ id: id, keyword: "images" })
  const { data, isLoading } = useGetTvShowsAllInformationQuery({ id: id })
  const { data: tvShowsRecommendations } = useGetTvShowsAllInformationQuery({ id: id, keyword: "recommendations" })


  if (isLoading) return <p>Loading wait</p>

  console.log({ data });
  return (
    <Layout>
      <Main movie>
        <Carrousel imagesData={tvShowsImages} />


        <MovieInfo data={data} />

        {/* movies by Actors*/}
        <Recommended title="Recommended Tv Shows">
          {tvShowsRecommendations && tvShowsRecommendations.results.length > 0 ? tvShowsRecommendations.results.slice(0, 12).map((movie: SingleResults, i) => {
            return (
              <Movie data={movie} key={i} />
            )
          }) : <div>Sorry No recommendation were found</div>}
        </Recommended>



      </Main>
    </Layout>
  )
}

export default Shows

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.id
    }
  }
}
