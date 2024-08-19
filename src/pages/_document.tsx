import { Html, Head, Main, NextScript } from 'next/document'
import { useTheme } from 'next-themes';

const Document = () => {
  const { theme } = useTheme();

  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1c1c1c" media="(prefers-color-scheme: dark)" />
      </Head>
      <body className='text-black bg-white dark:bg-primary-black-300 dark:text-white /*樣式變更動畫 transition-colors duration-100*/'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
