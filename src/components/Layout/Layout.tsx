import Head from "next/head"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutData } from "@/types/Layout/Layout";

const Layout = ({ children }: LayoutData) => {
  return (
    <>
      {/* HEAD */}
      <Head>
        <title>比特幣中文標題</title>
        <meta name="description" content="比特幣中文" />
      </Head>

      {/* Body */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout;
