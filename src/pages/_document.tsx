import { Html, Head, Main, NextScript } from 'next/document'
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const Document = () => {
  const { theme } = useTheme();

  useEffect(() => {
  document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
  }
  , []);

  return (
    <Html lang="en">
      <Head />
      <body className='overflow-hidden text-black dark:text-white m-0 p-0'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
