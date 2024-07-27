import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
import SubscribeSection from "@/components/Page/SubscribeSection";
import Head from "next/head";
import { GetStaticProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import { NewsPostProps } from "@/types/HomePage/NewsSection";
import { initAdmin } from "lib/firebaseAdmin";
import { TagsProps } from "@/types/Tag/Tag";

interface HomeProps extends NewsPostProps {
  SEO: any;
  Tags: TagsProps;
  SiteConfig: any;
}

const Home = (props: HomeProps) => {
  return (
    <>
      <Head>
        <title>{props.SEO.Index.title}</title>
        <meta name="description" content={props.SEO.Index.description} />
        <meta property="og:title" content={props.SEO.Index.title} />
        <meta property="og:description" content={props.SEO.Index.description} />
        <meta property="og:image" content={props.SEO.Index.image} />
        <meta property="og:type" content={props.SEO.Index.type} />
        <meta name="twitter:title" content={props.SEO.Index.title} />
        <meta name="twitter:description" content={props.SEO.Index.description} />
        <meta name="twitter:image" content={props.SEO.Index.image} />
      </Head>

      <Header></Header>
      <Navbar />
      <SwiperSection />
      <div className="sm:mx-auto sm:px-16 mx-8">
        <ButtonSection classname="py-8" />
        <HorizontalLine />
        <NewsSection
          initialPosts={props.initialPosts}
          initialSelection={props.initialSelection}
          tags={props.Tags}
          HomePageNewsListPerpage={props.SiteConfig.HomePageNewsListPerpage}
        />
        <HorizontalLine />
        <ContactSection className="py-16" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
      </div>
    </>
  );
};

// 獲取首頁的初始數據
export const getStaticProps: GetStaticProps = async () => {
  // 獲取首頁的新聞文章
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.HOST || 'localhost:3000'; // 確保 host 正確
  const apiUrl = `${protocol}://${host}/api/getPostsByFilter?type=News&author=all&tag=all`;

  const res = await fetch(apiUrl);
  const initialPosts: PostProps[] = await res.json();

  // 獲取SEO配置
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const seoFile = bucket.file('config/SEO.json');
  const seoFileContents = (await seoFile.download())[0].toString('utf8');
  const seoData = JSON.parse(seoFileContents);

  // 獲取Tag配置
  const tagFile = bucket.file('config/Tags.json');
  const tagFileContents = (await tagFile.download())[0].toString('utf8');
  const tagData = JSON.parse(tagFileContents);

  //獲取SiteConfig配置
  const siteConfigFile = bucket.file('config/SiteConfig.json');
  const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
  const siteConfigData = JSON.parse(siteConfigFileContents);

  return {
    props: {
      initialPosts,
      initialSelection: "all",
      SEO: seoData,
      Tags: tagData,
      SiteConfig: siteConfigData,
    },
  };
};

export default Home;
