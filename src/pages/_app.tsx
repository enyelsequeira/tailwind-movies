import type { AppProps } from 'next/app'
import "@/styles/main.css"
import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from '@/app/store';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}
export default MyApp
