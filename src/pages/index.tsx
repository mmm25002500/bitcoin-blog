import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
// import SubscribeSection from "@/components/Page/SubscribeSection";
import Head from "next/head";
import { GetServerSideProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import { TagsProps } from "@/types/Tag/Tag";
import { initAdmin } from "lib/firebaseAdmin";
import HeaderInfo from '@/components/Layout/HeaderInfo';

interface HomeProps {
  initialPosts: PostProps[] | undefined;
  initialSEO: any;
  initialTags: TagsProps;
  initialSiteConfig: any;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = (props: HomeProps) => {
  const { data: initialPosts, error } = useSWR<PostProps[]>('/api/getPostsByFilter?type=News&author=all&tag=all', fetcher, { fallbackData: props.initialPosts });
  const [selection, setSelection] = useState('all');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 68) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{props.initialSEO.Index.title}</title>
        <meta name="description" content={props.initialSEO.Index.description} />
        <meta property="og:title" content={props.initialSEO.Index.title} />
        <meta property="og:description" content={props.initialSEO.Index.description} />
        <meta property="og:image" content={props.initialSEO.Index.image} />
        <meta property="og:type" content={props.initialSEO.Index.type} />
        <meta name="twitter:title" content={props.initialSEO.Index.title} />
        <meta name="twitter:description" content={props.initialSEO.Index.description} />
        <meta name="twitter:image" content={props.initialSEO.Index.image} />
      </Head>

      <HeaderInfo />
      <Header />

      <div className={`top-0 w-full z-50 ${scrolled ? 'fixed bg-navbar-scrolled' : 'bg-navbar-default'}`} >
        <Navbar />
      </div>
      <div className={`${scrolled ? 'h-16' : ''}`} />

      <SwiperSection />
      <div className="sm:mx-auto sm:px-16">
        <p className='mb-9 mt-1 font-medium text-[10px] leading-[15.85px] text-[#7A7E84] dark:text-neutral-300 text-center'>
          <a target='_blank' href="https://pin.it/2mH0q5Frj">@bitcoinzh</a> photo from ©copyright Pinterest
        </p>
        <ButtonSection classname="pb-8" />
        <HorizontalLine className='my-3 pb-5' />
      </div>
      {
        initialPosts && (
          <NewsSection
            initialPosts={initialPosts}
            initialSelection={selection}
            tags={props.initialTags}
            HomePageNewsListPerpage={props.initialSiteConfig.HomePageNewsListPerpage}
          />
        )
      }
      {/* <HorizontalLine /> */}
      {/* <ContactSection className="py-16" /> */}
      {/* <HorizontalLine />
        <SubscribeSection className="py-16" /> */}
    </>
  );
};

// 取得首頁的初始資料
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 取得SEO設定
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    // 取得Tag設定
    const tagFile = bucket.file('config/Tags.json');
    const tagFileContents = (await tagFile.download())[0].toString('utf8');
    const tagData = JSON.parse(tagFileContents);

    // 取得SiteConfig設定
    const siteConfigFile = bucket.file('config/SiteConfig.json');
    const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
    const siteConfigData = JSON.parse(siteConfigFileContents);

    return {
      props: {
        initialSEO: seoData,
        initialTags: tagData,
        initialSiteConfig: siteConfigData
      },
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      props: {
        initialSEO: null,
        initialTags: null,
        initialSiteConfig: null
      },
    };
  }
};

export default Home;
