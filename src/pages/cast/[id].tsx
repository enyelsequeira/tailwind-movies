import { useGetMoviesByActorIdQuery, useGetActorsDetailsQuery, useGetActorImagesQuery } from "@/services/TMDB"
import { GetServerSideProps } from 'next'
import MovieImagesCarrousel from "@/components/movie-images-carrousel/movie-images-carrousel"
import SingleMovie from "@/components/movie/movie"
import Main from "@/components/main/main"
import Typography from "@/components/ui/typography"
import Layout from "@/layout"
import { useRouter } from 'next/router'




const People = ({ id }) => {
  // console.log(id);
  const { data, isLoading } = useGetActorsDetailsQuery(id)
  const { data: movieByActor } = useGetMoviesByActorIdQuery({ id: id, page: 1 })
  const { data: actorImages } = useGetActorImagesQuery({ id })
  const router = useRouter()
  // console.log({ data, movieByActor, actorImages });

  if (isLoading) <p>Still loading page</p>

  return (
    <Layout>
      <Main>
        <MovieImagesCarrousel imagesData={actorImages} />
        {data && <div className="px-1 md:px-[10px] py-2  md:col-span-6 lg:col-span-3 h-full md:max-h-full">
          <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
            <Typography as="h3" className="md:tracking-wider text-center" >{data.name}</Typography>
            <Typography as="h4" className="tracking-wide my-2"> {data.birthday} </Typography>
            <Typography as="h4" className="tracking-wide my-2">Born: {data.place_of_birth} </Typography>
          </div>
          <div>
            <Typography as="p">{data.biography}</Typography>
          </div>
          <div className="flex justify-between">
            <a target="_blank" href={`https://www.imdb.com/name/${data.imdb_id}`} rel="noreferrer">&rarr; More</a>
            <button className="bg-blue-600 text-white px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg hover:bg-blue-500 transition-all ease-in duration-300" onClick={() => router.back()}>&larr; Back </button>
          </div>
        </div>
        }


        {/* movies by Actors*/}
        <div className="flex flex-col pt-3 px-2 col-span-7">
          <Typography as="h2" className="my-2">Movies with {data?.name} </Typography>
          <div className="flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-4  max-h-screen  md:max-h-[1200px] overflow-auto no-scrollbar  py-2">
            {movieByActor ? movieByActor.results.slice(0, 12).map((movie, i) => {
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

export default People


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // console.log(ctx);
  return {
    props: {
      id: ctx.params.id
    }
  }
}
