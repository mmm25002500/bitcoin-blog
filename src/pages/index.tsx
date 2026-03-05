import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import ButtonSection from "@/components/HomePage/ButtonSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import Head from "next/head";
import type { GetStaticProps } from "next";
import type { PostProps } from "@/types/List/PostData";
import type { TagsProps } from "@/types/Tag/Tag";
import HeaderInfo from "@/components/Layout/HeaderInfo";
import BitcoinPriceOverlay from "@/components/HomePage/BitcoinPriceOverlay";
import SEO from "@/config/SEO.json";
import SiteConfig from "@/config/SiteConfig.json";
import { getBaseUrl } from "@/lib/utils";

const NewsSection = dynamic(() => import("@/components/HomePage/NewsSection"), {
  loading: () => <div className="h-96" />,
});

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
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showPriceOverlay, setShowPriceOverlay] = useState(false);

  // 使用 Intersection Observer 替代 scroll 事件監聽
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 在頂部往上滾觸發 Bitcoin 價格 overlay
  const handleOverlayClose = useCallback(() => {
    setShowPriceOverlay(false);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < 0 && !showPriceOverlay) {
        setShowPriceOverlay(true);
      }
    };

    let touchStartY = 0;
    let isPullingDown = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isPullingDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (showPriceOverlay) return;
      const deltaY = e.touches[0].clientY - touchStartY;
      // 在頂部往下拉時，阻止瀏覽器 pull-to-refresh
      if (window.scrollY === 0 && deltaY > 0) {
        e.preventDefault();
        if (deltaY > 80) {
          isPullingDown = true;
        }
      }
    };

    const handleTouchEnd = () => {
      if (isPullingDown && window.scrollY === 0 && !showPriceOverlay) {
        setShowPriceOverlay(true);
      }
      isPullingDown = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    // touchmove 必須是 non-passive 才能 preventDefault
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showPriceOverlay]);

  // overlay 開啟時阻止頁面滾動
  useEffect(() => {
    if (showPriceOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPriceOverlay]);

  return (
    <>
      <BitcoinPriceOverlay open={showPriceOverlay} onClose={handleOverlayClose} />
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
      {/* Sentinel for scroll detection */}
      <div ref={sentinelRef} className="absolute top-[68px] h-0" />

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

// 取得首頁的初始資料 - 使用 ISR 每 60 秒重新生成
export const getStaticProps: GetStaticProps = async () => {
  try {
    // 從 API 取得 Tags
    const baseUrl = getBaseUrl();

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
      revalidate: 60, // ISR: 每 60 秒重新生成頁面
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
      revalidate: 60,
    };
  }
};

export default Home;
