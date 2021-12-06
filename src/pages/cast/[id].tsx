import { useGetMoviesByActorIdQuery, useGetActorsDetailsQuery, useGetActorImagesQuery } from "@/services/TMDB"
import { GetServerSideProps } from 'next'
import Layout from "@/layout"
import { useRouter } from 'next/router'
import { useState } from "react"
import { SingleResults } from "@/types/types"
import { Carrousel, Loader, Main, Movie, Recommended, SEOComponent } from "@/components"
import { Button, Typography } from "@/components/ui"
import useAlanAi from "@/helpers/alan"
import PageLayout from "@/layout/pages-layout"




const People = ({ id }) => {
  const { data, isLoading } = useGetActorsDetailsQuery(id)
  const { data: movieByActor } = useGetMoviesByActorIdQuery({ id: id, page: 1 })
  const { data: actorImages } = useGetActorImagesQuery({ id })
  const router = useRouter()
  const [more, setMore] = useState(false)




  return (
    <PageLayout seoProps={{ title: data ? `${data.name} Page` : "Actors page", description: data ? `${data.biography} ` : "Actors information" }}>
      {isLoading ? <Loader isInfo /> : (
        <>
          <Carrousel imagesData={actorImages} />
          {data && <div className="px-1 md:px-[10px] py-2  md:col-span-6 lg:col-span-3 h-full md:max-h-full">
            <div className="mt-5  border-red-900  flex flex-col items-center md:items-center">
              <Typography as="h3" className="md:tracking-wider text-center" >{data.name}</Typography>
              <Typography as="h4" className="tracking-wide my-2"> {data.birthday} </Typography>
              <Typography as="h4" className="tracking-wide my-2">Born: {data.place_of_birth} </Typography>
            </div>
            <div className="space-y-3">
              <Typography as="p" className={more ? "line-clamp-none" : "line-clamp-6"}>{data.biography}</Typography>
              <Button variant="secondary" resetStyles onClick={() => setMore(!more)} className="p-2 rounded-xl">{more ? "Less" : "More"} &rarr; </Button>
            </div>
            <div className="flex justify-between mt-4">
              <a className="bg-white text-blue-500 px-2 md:px-4  h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary" target="_blank" href={`https://www.imdb.com/name/${data.imdb_id}`} rel="noreferrer" >&rarr; IMDB</a>
              <Button variant="secondary" onClick={() => router.back()}>&larr; Back </Button>
            </div>
          </div>
          }


          {/* movies by Actors*/}
          <Recommended title={`Movies with ${data?.name} `}>
            {movieByActor && movieByActor.results.length > 0 ? movieByActor.results.slice(0, 12).map((movie: SingleResults, i) => {
              return (
                <Movie data={movie} key={i} />
              )
            }) : <div>Sorry No recommendation were found</div>}
          </Recommended>
        </>
      )}
    </PageLayout>
  )
}



export default People


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  return {
    props: {
      id: ctx.params.id
    }
  }
}







