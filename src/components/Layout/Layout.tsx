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
        <title>比特幣中文標題</title>
        <meta name="description" content="比特幣中文" />
        {
          theme === 'dark' ?
            <meta name="theme-color" content="#ffffff" />
            :
            <meta name="theme-color" content="#1c1c1c" />
        }
      </Head>

      {/* Body */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow z-0">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout;
