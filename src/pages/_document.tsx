import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

const Document = () => {

  useEffect(() => {
    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }, []);

  return (
    <Html lang="en" className="">
      <Head>
        {/* Preload LCP image */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FS__4964469.221cc2d9.jpg&w=1920&q=75"
          // @ts-ignore
          fetchpriority="high"
        />
      </Head>
      <body className={"text-black dark:text-white m-0 p-0"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
