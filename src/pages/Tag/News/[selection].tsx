import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";
import AuthorData from '@/config/Author.json';
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "@/components/Layout/Header";
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import Tags from "@/config/Tags.json";
import NewsListAll from "@/components/List/NewsListAll";
import Head from "next/head";
import SEO from "@/config/SEO.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation } from 'swiper/modules';

import right from '@/icons/right.svg';
import left from '@/icons/left.svg';
import Image from 'next/image';

// 文章列表頁面
const All = ({ initialPosts, initialSelection }: { initialPosts: PostProps[], initialSelection: string }) => {
  const router = useRouter();
  const { selection } = router.query;

  const [currentSelection, setCurrentSelection] = useState<string>(initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);
  const [currentType, setCurrentType] = useState<string>('News');
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
      router.push(`/Tag/News/${currentSelection}`, undefined, { shallow: true });
    }
  }, [currentSelection, selection, router]);

  return (
    <>
      <Head>
        <title>{SEO.TagPost.title}</title>
        <meta name="description" content={SEO.TagPost.description} />
        <meta property="og:title" content={SEO.TagPost.title} />
        <meta property="og:description" content={SEO.TagPost.description} />
        <meta property="og:image" content={SEO.TagPost.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.TagPost.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.TagPost.title} />
        <meta name="twitter:description" content={SEO.TagPost.description} />
        <meta name="twitter:image" content={SEO.TagPost.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <div className="mx-auto px-6 sm:px-28">
        <div className="my-5">
          {/* 標題 */}
          <p className="text-center font-bold text-2xl leading-[24.38px] sm:text-[28px] sm:leading-[42px]">
            News
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

              {Tags.News.map((tag, idx) => (
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
        <NewsListAll data={filteredPosts} />
      </div>
    </>
  );
}

// 設置靜態路徑
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Tags.News.map(tag => ({
    params: { selection: tag }
  }));

  // 添加默認路徑
  paths.push({ params: { selection: 'default' } });

  return { paths, fallback: 'blocking' };
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const selection = params?.selection || 'default';
  const tag = selection === 'default' ? Tags.News[0] : selection;

  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);
  let initialPosts: PostProps[] = [];

  authorDirs.forEach((userID) => {
    const articlesDirectory = join(basePath, userID);
    const fileNames = readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));

    fileNames.forEach((fileName) => {
      const filePath = join(articlesDirectory, fileName);
      const fileContents = readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContents);

      const author = AuthorData.find(author => author.id === userID);

      const post: PostProps = {
        title: data.title || '',
        description: data.description || '',
        tags: data.tags || [],
        date: typeof data.date === 'string' ? Date.parse(data.date) : data.date,
        type: data.type || 'News',
        id: fileName.replace(/\.mdx$/, ''),
        authorData: {
          id: userID,
          fullname: author?.fullname || '',
          name: author?.name || '',
          img: author?.image || '',
          description: author?.description || '',
        },
        img: data.img || undefined,
        image: data.image || undefined,
      };

      if (data.tags.includes(tag)) {
        initialPosts.push(post);
      }
    });
  });

  return {
    props: {
      initialPosts,
      initialSelection: tag,
    },
  };
};

export default All;
