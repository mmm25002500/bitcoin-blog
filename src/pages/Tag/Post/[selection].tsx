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
import PostListAll from "@/components/List/PostListAll";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode } from 'swiper/modules';

// 文章列表頁面
const All = ({ initialPosts, initialSelection }: { initialPosts: PostProps[], initialSelection: string }) => {
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
          <div className="w-full h-7">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
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

              {Tags.Post.map((tag, idx) => (
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
          </div>
        </div>
        <div>
          <PostListAll data={filteredPosts} />
        </div>
      </div>
    </>
  );
}

// 設置靜態路徑
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Tags.Post.map(tag => ({
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
        type: data.type || 'Post',
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

      if (data.tags.includes(selection)) {
        initialPosts.push(post);
      }
    });
  });

  return {
    props: {
      initialPosts,
      initialSelection: selection,
    },
  };
};

export default All;
