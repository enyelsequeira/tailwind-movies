import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useGetMoviesQuery } from "@/services/TMDB";
import { useSelector } from "react-redux";
import { RootState } from "@/app-reducers/rootReducer";
import { Hero, Movies, ShowsBox } from "@/components";
import useAlanAi from "@/helpers/alan";
import Layout from "@/layout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchGenres, useGenres } from "@/hooks/queries/useGenres";
import { useGetMovies } from "@/hooks/queries/useGetMovies";

const Home: NextPage = () => {
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );
  const { data, error, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page: 1,
    searchQuery,
  });

  const movie = Math.floor(Math.random() * data?.results.length);
  // useAlanAi();
  const { genres } = useGenres();
  console.log({ genres });

  return (
    <Layout>
      <div className="text-white">{/* show strignigy  */} HOMEPAGE</div>
    </Layout>
    // <PageLayout
    //   seoProps={{
    //     title: "Home page of the movie app",
    //     description:
    //       "Home page where you can choose what to watch and search, don't know what your're looking for? try and just click a category",
    //   }}
    // >
    //   {isLoading ? (
    //     <div> I am loading wait</div>
    //   ) : (
    //     <Hero data={data?.results[movie]} />
    //   )}
    //   {error && <div>There was an error fetching data</div>}
    //   <ShowsBox title="Most Rated Shows" />
    //   <Movies />
    // </PageLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
