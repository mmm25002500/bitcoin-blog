import { useEffect, useState } from "react";
import useSWR from "swr";
import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
// import SubscribeSection from "@/components/Page/SubscribeSection";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/types/List/PostData";
import type { TagsProps } from "@/types/Tag/Tag";
import HeaderInfo from "@/components/Layout/HeaderInfo";
import SEO from "@/config/SEO.json";
import SiteConfig from "@/config/SiteConfig.json";

interface HomeProps {
  initialPosts: PostProps[] | undefined;
  initialTags: TagsProps;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = (props: HomeProps) => {
  const { data: initialPosts, error } = useSWR<PostProps[]>(
    "/api/getPostsByFilter?type=News&author=all&tag=all",
    fetcher,
    { fallbackData: props.initialPosts || [] },
  );
  const [selection, setSelection] = useState("all");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 68) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{SEO.Index.title}</title>
        <meta name="description" content={SEO.Index.description} />
        <meta property="og:title" content={SEO.Index.title} />
        <meta
          property="og:description"
          content={SEO.Index.description}
        />
        <meta property="og:image" content={SEO.Index.image} />
        <meta property="og:type" content={SEO.Index.type} />
        <meta name="twitter:title" content={SEO.Index.title} />
        <meta
          name="twitter:description"
          content={SEO.Index.description}
        />
        <meta name="twitter:image" content={SEO.Index.image} />
      </Head>

      <HeaderInfo />
      <Header />

      <div
        className={`top-0 w-full z-50 ${scrolled ? "fixed bg-navbar-scrolled" : "bg-navbar-default"}`}
      >
        <Navbar scrolled={scrolled} />
      </div>
      <div className={`${scrolled ? "h-16" : ""}`} />

      <SwiperSection />
      <div className="sm:mx-auto sm:px-16">
        <p className="mb-9 mt-1 font-medium text-[10px] leading-[15.85px] text-[#7A7E84] dark:text-neutral-300 text-center">
          <a target="_blank" href="https://pin.it/2mH0q5Frj" rel="noreferrer">
            @bitcoinzh
          </a>{" "}
          photo from ©copyright Pinterest
        </p>
        <ButtonSection classname="pb-8" />
        <HorizontalLine className="my-3 pb-5" />
      </div>
      {initialPosts && Array.isArray(initialPosts) && (
        <NewsSection
          initialPosts={initialPosts}
          initialSelection={selection}
          tags={props.initialTags}
          HomePageNewsListPerpage={SiteConfig.HomePageNewsListPerpage}
        />
      )}
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
    // 從 API 取得 Tags
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const [allTagsRes, newsTagsRes, postTagsRes, postsRes] = await Promise.all([
      fetch(`${baseUrl}/api/tags/getAllTags`),
      fetch(`${baseUrl}/api/tags/News/getTags`),
      fetch(`${baseUrl}/api/tags/Posts/getTags`),
      fetch(`${baseUrl}/api/getPostsByFilter?type=News&author=all&tag=all`),
    ]);

    const allTagsResult = await allTagsRes.json();
    const newsTagsResult = await newsTagsRes.json();
    const postTagsResult = await postTagsRes.json();
    const postsData = await postsRes.json();

    const tagsData: TagsProps = {
      all: allTagsResult.success ? allTagsResult.tags : [],
      News: newsTagsResult.success ? newsTagsResult.tags : [],
      Post: postTagsResult.success ? postTagsResult.tags : [],
    };

    return {
      props: {
        initialPosts: Array.isArray(postsData) ? postsData : [],
        initialTags: tagsData,
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      props: {
        initialPosts: [],
        initialTags: {
          all: [],
          News: [],
          Post: [],
        },
      },
    };
  }
};

export default Home;
