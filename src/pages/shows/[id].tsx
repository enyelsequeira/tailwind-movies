import { Carrousel, Loader, Movie, Recommended, } from "@/components"
import ShowInfo from "@/components/show-info"
import { Typography } from "@/components/ui"
import PageLayout from "@/layout/pages-layout"
import { useGetTvShowsAllInformationQuery } from "@/services/TMDB"
import { SingleResults } from "@/types/types"
import { GetServerSideProps } from "next"


const Shows = ({ id }: { id: string }) => {
  const { data: tvShowsImages, isLoading: imagesLoading } = useGetTvShowsAllInformationQuery({ id: id, keyword: "images" })
  const { data, isLoading, error } = useGetTvShowsAllInformationQuery({ id: id })
  const { data: tvShowsRecommendations } = useGetTvShowsAllInformationQuery({ id: id, keyword: "recommendations" })




  return (
    <PageLayout seoProps={{ title: data ? `${data?.name} page` : "shows tv page", description: data ? `${data?.overview}` : "Information about tv shows" }}>
      {isLoading ? <Loader isInfo /> : (
        <>
          {imagesLoading ? <Loader /> : <Carrousel imagesData={tvShowsImages} />}
          <ShowInfo data={data} />

          {/* movies by Actors*/}
          <Recommended title="Recommended Tv Shows">
            {tvShowsRecommendations && tvShowsRecommendations.results.length > 0 ? tvShowsRecommendations.results.slice(0, 12).map((movie: SingleResults, i: number) => {
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

export default Shows

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.id
    }
  }
}
