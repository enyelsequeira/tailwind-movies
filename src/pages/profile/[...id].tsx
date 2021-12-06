import { Loader, Movie, Recommended, } from "@/components";
import { Typography } from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { useGetListQuery } from "@/services/TMDB";
import { SingleResults } from "@/types/types";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link"
import { useRouter } from "next/router";
import PageLayout from "@/layout/pages-layout";


const Profile = ({ id }) => {
  const { isAuthenticated, user } = useAuth()

  const router = useRouter()
  const sessionId = typeof window !== "undefined" ? localStorage.getItem("session_id") : null

  const { data, isLoading, error, refetch: refecthWatchList } = useGetListQuery({ listName: "watchlist/movies", accountId: id, sessionId, page: 1 })
  const { data: favoriteMovies, refetch: refetchFavoriteList } = useGetListQuery({ listName: "favorite/movies", accountId: id, sessionId, page: 1 })


  useEffect(() => {
    refecthWatchList()
    refetchFavoriteList()
  }, [])




  if (isLoading) return <Loader isInfo />
  if (error) {
    return (
      <Typography as="h3">Sorry there was an error fetching data <Typography className="text-red-500 cursor-pointer" as="span" onClick={() => router.push("/")}> Go Back</Typography>  </Typography>
    )
  }

  return (
    <PageLayout seoProps={{ title: data ? `${user.name}'s Profile'` : "Profile's Page", description: user ? `This is the profile page of ${user.name}` : "Profiles Page" }}>

      {!isAuthenticated ? (
        <div className="col-span-7 my-2 flex items-center mx-auto py-5">
          <Typography as="h2">
            Sorry you need to be authenticated to see this page.

            <Link href="/">
              <a className="text-red-500">Go back</a>
            </Link>
          </Typography>

        </div>
      ) : (
        <>
          <Typography as="h1" className="col-span-7 my-2">Welcome,  <Typography as="span" className="text-red-400 "> {user.name} </Typography> </Typography>
          <Recommended profile title="Favorite Movies"> {favoriteMovies && favoriteMovies.results.length > 0 ? favoriteMovies.results.slice(0, 8).map((movie: SingleResults, i) => {
            return (
              <Movie data={movie} key={i} value={i} />
            )
          }) : <div>Sorry No Favorites yet</div>} </Recommended>

          <Recommended profile title="WatchList"> {data && data.results.length > 0 ? data.results.slice(0, 8).map((movie: SingleResults, i) => {
            return (
              <Movie data={movie} key={i} value={i} />
            )
          }) : <div>No watchList yet</div>}
          </Recommended>
        </>
      )}
    </PageLayout>
  );
};

export default Profile;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.params.id
    }
  }
}

