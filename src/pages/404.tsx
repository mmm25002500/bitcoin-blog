import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import NotFound from "@/components/NotFound/NotFound";
import Head from "next/head";
import { initAdmin } from "lib/firebaseAdmin";
import { GetStaticProps } from "next";

const NotFoundPage = ({ SEO }: { SEO?: any }) => {
  const defaultSEO = {
    NotFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
      image: "/default-image.png",
      type: "website"
    }
  };

  const seo = SEO || defaultSEO;

  return (
    <>
      <Head>
        <title>{seo?.NotFound?.title}</title>
        <meta name="description" content={seo?.NotFound?.description} />
        <meta property="og:title" content={seo?.NotFound?.title} />
        <meta property="og:description" content={seo?.NotFound?.description} />
        <meta property="og:image" content={seo?.NotFound?.image} />
        <meta property="og:type" content={seo?.NotFound?.type} />
        <meta name="twitter:title" content={seo?.NotFound?.title} />
        <meta name="twitter:description" content={seo?.NotFound?.description} />
        <meta name="twitter:image" content={seo?.NotFound?.image} />
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    // 取得SEO設定
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    return {
      props: {
        SEO: seoData,
      },
    };
  } catch (error) {
    console.error('Error fetching article content or SEO/author data:', error);
    return { props: {} }; // 如果出錯，回傳空資料
  }
};

export default NotFoundPage;
