import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "@/components/Layout/Header";
import { GetStaticPaths, GetStaticProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import PostListAll from "@/components/List/PostListAll";
import { initAdmin } from '../../../../lib/firebaseAdmin';
import Head from "next/head";
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation } from 'swiper/modules';

import right from '@/icons/right.svg';
import left from '@/icons/left.svg';

// 文章列表頁面
const All = ({ initialPosts, initialSelection, seo, tags, SiteConfig }: { initialPosts: PostProps[], initialSelection: string, seo: any, tags: string[], SiteConfig: any }) => {
  const router = useRouter();
  const { selection } = router.query;

  const [currentSelection, setCurrentSelection] = useState<string>(initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);
  const [currentType, setCurrentType] = useState<string>('Post');
  const [currentAuthor, setCurrentAuthor] = useState<string>('all');

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await axios.get('/api/getPostsByFilter', {
        params: { type: currentType, author: currentAuthor, tag: currentSelection }
      });
      setFilteredPosts(response.data);
    };

    fetchFilteredPosts();
  }, [currentSelection, currentType, currentAuthor]);

  // 當 currentSelection 改變時更新 URL
  useEffect(() => {
    if (selection !== currentSelection) {
      router.push(`/Tag/Post/${currentSelection}`, undefined, { shallow: true });
    }
  }, [currentSelection, selection, router]);

  return (
    <>
      <Head>
        <title>{seo.TagPost.title}</title>
        <meta name="description" content={seo.TagPost.description} />
        <meta property="og:title" content={seo.TagPost.title} />
        <meta property="og:description" content={seo.TagPost.description} />
        <meta property="og:image" content={seo.TagPost.image} />
        <meta property="og:type" content={seo.TagPost.type} />
        <meta name="twitter:title" content={seo.TagPost.title} />
        <meta name="twitter:description" content={seo.TagPost.description} />
        <meta name="twitter:image" content={seo.TagPost.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <div className="mx-auto px-6 sm:px-28">
        <div className="my-5">
          {/* 標題 */}
          <p className="text-center font-bold text-2xl leading-[24.38px] sm:text-[28px] sm:leading-[42px]">
            Posters
          </p>

          {/* 標籤 */}
          <div className="relative w-full h-7 mt-4">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              freeMode={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[FreeMode, Navigation]}
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
        </div>
      </div>
      <div className="mx-auto sm:px-28">
        <PostListAll
          data={filteredPosts}
          postsPerPage={SiteConfig.PostListAllPerpage}
        />
      </div>
    </>
  );
}

// 設置靜態路徑
export const getStaticPaths: GetStaticPaths = async () => {
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const tagsFile = bucket.file('config/Tags.json');
  const tagsFileContents = (await tagsFile.download())[0].toString('utf8');
  const tagsData = JSON.parse(tagsFileContents);

  const paths = tagsData.Post.map((tag: string) => ({
    params: { selection: tag }
  }));

  // 添加默認路徑
  paths.push({ params: { selection: 'all' } });

  return { paths, fallback: 'blocking' };
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const selection = params?.selection;

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.HOST || 'localhost:3000';
  const apiUrl = `${protocol}://${host}/api/getPostsByFilter?type=Post&author=all&tag=${selection}`;

  // 獲取初始文章
  const res = await fetch(apiUrl);
  const initialPosts = await res.json();

  // 獲取SEO配置
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const seoFile = bucket.file('config/SEO.json');
  const seoFileContents = (await seoFile.download())[0].toString('utf8');
  const seoData = JSON.parse(seoFileContents);

  // 獲取Tag配置
  const tagsFile = bucket.file('config/Tags.json');
  const tagsFileContents = (await tagsFile.download())[0].toString('utf8');
  const tagsData = JSON.parse(tagsFileContents);

  // 獲取SiteConfig配置
  const siteConfigFile = bucket.file('config/SiteConfig.json');
  const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
  const siteConfigData = JSON.parse(siteConfigFileContents);

  return {
    props: {
      initialPosts,
      initialSelection: selection,
      seo: seoData,
      tags: tagsData.Post,
      SiteConfig: siteConfigData,
    },
  };
};

export default All;
