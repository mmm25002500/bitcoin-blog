import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className='text-black bg-white dark:bg-gray-900 dark:text-white transition-colors duration-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
