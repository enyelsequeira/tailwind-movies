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
    <ThemeProvider attribute="class">
      <DefaultSeo  {...SEO} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </ThemeProvider>
  )
}
export default MyApp
