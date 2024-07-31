import '@/styles/globals.css';
import { ThemeProvider, useTheme } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const ThemeInitializer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 如果 theme 是 system，設定為 dark，預設暗色模式。
    if (theme === 'system') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  if (!mounted) return null;
  return null;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <ThemeInitializer />
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
