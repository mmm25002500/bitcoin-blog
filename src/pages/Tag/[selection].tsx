import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "@/components/Layout/Header";
import { GetServerSideProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import NewsListAll from "@/components/List/NewsListAll";
import { initAdmin } from "../../../lib/firebaseAdmin";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation } from 'swiper/modules';

import right from '@/icons/right.svg';
import left from '@/icons/left.svg';
import Image from 'next/image';
import Head from "next/head";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 文章列表頁面
const All = ({ initialPosts, initialSelection, seo, tags, SiteConfig }: { initialPosts: PostProps[], initialSelection: string, seo: any, tags: string[], SiteConfig: any }) => {
  const router = useRouter();
  const { selection } = router.query;

  const [currentSelection, setCurrentSelection] = useState<string>(initialSelection);
  const [currentType, setCurrentType] = useState<string>('both');
  const [currentAuthor, setCurrentAuthor] = useState<string>('all');

  // 使用 useSWR 獲取篩選後的文章
  const { data: filteredPosts, error } = useSWR<PostProps[]>(
    `/api/getPostsByFilter?type=${currentType}&author=${currentAuthor}&tag=${currentSelection}`,
    fetcher,
    { fallbackData: initialPosts }
  );

  // 當 currentSelection 改變時更新 URL
  useEffect(() => {
    if (selection !== currentSelection) {
      router.push(`/Tag/${currentSelection}`, undefined, { shallow: true });
    }
  }, [currentSelection, selection, router]);

  return (
    <>
      <Head>
        <title>{seo.Tag.title}</title>
        <meta name="description" content={seo.Tag.description} />
        <meta property="og:title" content={seo.Tag.title} />
        <meta property="og:description" content={seo.Tag.description} />
        <meta property="og:image" content={seo.Tag.image} />
        <meta property="og:type" content={seo.Tag.type} />
        <meta name="twitter:title" content={seo.Tag.title} />
        <meta name="twitter:description" content={seo.Tag.description} />
        <meta name="twitter:image" content={seo.Tag.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <div className="mx-auto px-6 sm:px-28">
        <div className="my-5">
          {/* 標籤 */}
          <div className="relative w-full h-7 mb-4">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode, Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="w-full h-7"
            >
              <SwiperSlide key={"all"} className="!w-auto">
                <Radio.Btn
                  text="All"
                  value="all"
                  id="All"
                  selectedValue={currentSelection}
                  onChange={(value: string) => setCurrentSelection(value)}
                  className={`text-xs py-1 px-3 ${currentSelection === "all" ? 'bg-black text-white' : ''}`}
                />
              </SwiperSlide>

              {tags.map((tag, idx) => (
                <SwiperSlide key={idx} className="!w-auto">
                  <Radio.Btn
                    text={tag}
                    value={tag}
                    id={tag}
                    selectedValue={currentSelection}
                    onChange={(value: string) => setCurrentSelection(value)}
                    className={`text-xs py-1 px-3 ${currentSelection === tag ? 'bg-black text-white' : ''}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 左右箭頭 */}
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <Image
                src={left}
                alt="Icon Dark"
                width={1000}
                height={1000}
                className="rounded-full w-5 h-5 dark:invert"
              />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <Image
                src={right}
                alt="Icon Dark"
                width={1000}
                height={1000}
                className="rounded-full w-5 h-5 dark:invert"
              />
            </div>
          </div>

          {/* 標題 */}
          <p className="text-center font-bold text-2xl leading-[24.38px] sm:text-[28px] sm:leading-[42px]">
            {currentSelection}
          </p>
        </div>
      </div>
      <div className="mx-auto sm:px-28">
        {
          filteredPosts && <NewsListAll
            data={filteredPosts}
            postsPerPage={SiteConfig.NewsListAllPerpage}
          />
        }
      </div>
    </>
  );
}

// 獲取靜態頁面所需的數據
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const selection = params?.selection || 'all';

  // 獲取SEO配置
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const seoFile = bucket.file('config/SEO.json');
  const seoFileContents = (await seoFile.download())[0].toString('utf8');
  const seoData = JSON.parse(seoFileContents);

  const tagsFile = bucket.file('config/Tags.json');
  const tagsFileContents = (await tagsFile.download())[0].toString('utf8');
  const tagsData = JSON.parse(tagsFileContents);

  // 獲取 SiteConfig 配置
  const siteConfigFile = bucket.file('config/SiteConfig.json');
  const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
  const siteConfigData = JSON.parse(siteConfigFileContents);

  return {
    props: {
      initialSelection: selection,
      seo: seoData,
      tags: tagsData.News,
      SiteConfig: siteConfigData,
    },
  };
};

export default All;
