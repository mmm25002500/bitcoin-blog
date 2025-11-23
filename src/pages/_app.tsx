import '@/styles/globals.css';
import { ThemeProvider, useTheme } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Font Awesome 優化 - 避免 CSS 重複載入
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setIsTransitioning(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <ThemeProvider attribute="class">
      <ThemeInitializer />
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <Layout>
          <NextNProgress color='#F7931A' />
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default App;
