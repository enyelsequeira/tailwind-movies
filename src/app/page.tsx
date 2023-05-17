import getQueryClient from "./getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "./hydrate-query";
import { fetchInitialdata } from "@/hooks/useGetHomePage";
import InitialPage from "./inital";
import { fetchInitialShow } from "@/hooks/useGetShows";


const IndexPage = async ({ searchParams }) => {
  console.log({ searchParams });
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["initial-page"],
    queryFn: async () => fetchInitialdata(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["initial-shows"],
    queryFn: async () => fetchInitialShow(1),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <InitialPage />
    </Hydrate>
  );
};

export default IndexPage;
