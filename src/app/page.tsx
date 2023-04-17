import getQueryClient from "./getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "./hydrate-query";
import { fetchInitialdata } from "@/hooks/useGetHomePage";
import InitialPage from "./inital";
import { fetchInitialShow } from "@/hooks/useGetShows";
import { Buttons } from "@/components/test-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const IndexPage = async () => {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["initial-page"],
    queryFn: async () => fetchInitialdata(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["initial-shows"],
    queryFn: async () => fetchInitialShow(1),
  });
  console.log({ main: session });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <InitialPage />
    </Hydrate>
  );
};

export default IndexPage;
