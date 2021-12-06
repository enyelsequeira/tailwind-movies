import type { AppProps } from 'next/app'
import "@/styles/main.css"
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { DefaultSeo } from 'next-seo';

import { AnimatePresence } from "framer-motion";
import SEO from "@@/next-seo.config"


function MyApp({ Component, pageProps }: AppProps) {



  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <DefaultSeo  {...SEO} />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  )
}
export default MyApp
