import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App;
