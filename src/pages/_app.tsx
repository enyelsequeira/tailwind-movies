import type { AppProps } from 'next/app'
import "@/styles/main.css"
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from '@/app/store';

import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </ThemeProvider>
  )
}
export default MyApp
