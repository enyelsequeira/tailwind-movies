import type { AppProps } from "next/app";
import "@/styles/main.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { DefaultSeo } from "next-seo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { AnimatePresence } from "framer-motion";
import SEO from "@@/next-seo.config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <ThemeProvider attribute="class">
            <DefaultSeo {...SEO} />
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} />
            </AnimatePresence>
          </ThemeProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
