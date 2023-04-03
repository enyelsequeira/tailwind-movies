import { fetchGenres } from "@/hooks/useGenres";
import getQueryClient from "./getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "./hydrate-query";

const IndexPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["genres"],

    queryFn: fetchGenres,
  });
  const dehydratedState = dehydrate(queryClient);
  return <Hydrate state={dehydratedState}></Hydrate>;
};

export default IndexPage;
