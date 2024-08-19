import Head from "next/head"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutData } from "@/types/Layout/Layout";
import { useTheme } from 'next-themes';

const Layout = ({ children }: LayoutData) => {
  const { theme } = useTheme();

  return (
    <>
      {/* HEAD */}
      <Head>
        {/* <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#1c1c1c" media="(prefers-color-scheme: light)" /> */}
        {
          theme === 'dark' ?
            <meta name="theme-color" content="white" />
            :
            <meta name="theme-color" content="#1c1c1c" />
        }
      </Head>

      {/* Body */}
      <div id="body" className="overflow-y-auto h-[100vh] bg-white dark:bg-primary-black-300">
        <main className="z-0">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout;
