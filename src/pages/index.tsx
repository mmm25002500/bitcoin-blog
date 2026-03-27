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
  const [enterProgress, setEnterProgress] = useState(0); // 0~1 開啟過渡進度
  const enterProgressRef = useRef(0);
  const isSnappingRef = useRef(false);

  // 使用 Intersection Observer 替代 scroll 事件監聯
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

  const ENTER_THRESHOLD = 0.3;
  const ENTER_SCROLL_SENSITIVITY = 0.003;

  // 在頂部往上滾觸發 Bitcoin 價格 overlay
  const handleOverlayClose = useCallback(() => {
    setShowPriceOverlay(false);
    setEnterProgress(0);
    enterProgressRef.current = 0;
    isSnappingRef.current = false;
  }, []);

  // snap 進度到目標值（1=完全打開, 0=收回）
  const snapEnterTo = useCallback((target: number) => {
    if (isSnappingRef.current) return;
    isSnappingRef.current = true;

    if (target >= 1) {
      // 完全打開
      const start = enterProgressRef.current;
      const duration = 250;
      const startTime = performance.now();
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - t) * (1 - t);
        const value = start + (1 - start) * eased;
        enterProgressRef.current = value;
        setEnterProgress(value);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          setShowPriceOverlay(true);
          isSnappingRef.current = false;
        }
      };
      requestAnimationFrame(animate);
    } else {
      // 收回
      const start = enterProgressRef.current;
      const duration = 250;
      const startTime = performance.now();
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - t) * (1 - t);
        const value = start * (1 - eased);
        enterProgressRef.current = value;
        setEnterProgress(value);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          isSnappingRef.current = false;
        }
      };
      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (showPriceOverlay) return;

    const handleWheel = (e: WheelEvent) => {
      if (isSnappingRef.current) return;
      if (window.scrollY !== 0) return;

      // deltaY < 0 = 往上滑 → 拉出 overlay
      if (e.deltaY < 0) {
        const delta = Math.abs(e.deltaY) * ENTER_SCROLL_SENSITIVITY;
        const next = Math.min(1, enterProgressRef.current + delta);
        enterProgressRef.current = next;
        setEnterProgress(next);

        if (next >= ENTER_THRESHOLD) {
          snapEnterTo(1);
        }
      } else if (e.deltaY > 0 && enterProgressRef.current > 0) {
        // 往下滑 → 收回 overlay
        const delta = e.deltaY * ENTER_SCROLL_SENSITIVITY;
        const next = Math.max(0, enterProgressRef.current - delta);
        enterProgressRef.current = next;
        setEnterProgress(next);
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (isSnappingRef.current) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSnappingRef.current || showPriceOverlay) return;
      const deltaY = e.touches[0].clientY - touchStartY;
      if (window.scrollY === 0 && deltaY > 0) {
        e.preventDefault();
        const progress = Math.min(1, deltaY / window.innerHeight);
        enterProgressRef.current = progress;
        setEnterProgress(progress);
      }
    };

    const handleTouchEnd = () => {
      if (isSnappingRef.current || showPriceOverlay) return;
      if (enterProgressRef.current >= ENTER_THRESHOLD) {
        snapEnterTo(1);
      } else if (enterProgressRef.current > 0) {
        snapEnterTo(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showPriceOverlay, snapEnterTo]);

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
      <BitcoinPriceOverlay open={showPriceOverlay} onClose={handleOverlayClose} enterProgress={enterProgress} />
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
