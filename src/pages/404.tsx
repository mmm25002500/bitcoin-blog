import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import NotFound from "@/components/NotFound/NotFound";
import Head from "next/head";
import SEO from "@/config/SEO.json";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>{SEO.NotFound.title}</title>
        <meta name="description" content={SEO.NotFound.description} />
        <meta property="og:title" content={SEO.NotFound.title} />
        <meta property="og:description" content={SEO.NotFound.description} />
        <meta property="og:image" content={SEO.NotFound.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.NotFound.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.NotFound.title} />
        <meta name="twitter:description" content={SEO.NotFound.description} />
        <meta name="twitter:image" content={SEO.NotFound.image} />
      </Head>

      <div className="sm:hidden">
        <Header></Header>
      </div>
      <Navbar />
      <HorizontalLine />
      <NotFound></NotFound>
    </>
  )
}

export default NotFoundPage;
