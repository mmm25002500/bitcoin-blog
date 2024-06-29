import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";
import AuthorData from '@/config/Author.json';
import { useEffect, useState } from "react";
import axios from 'axios';

import Header from "@/components/Layout/Header";
import PostList from "@/components/List/PostList";

import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import { MarkDownProps } from '@/types/User/UserID';
import Radio from "@/components/Radio/Radio";
import Tags from "@/config/Tags.json";

// 通過使用者ID 獲取使用者資料
const getAuthorData = (userID: string) => {
  return AuthorData.filter((author) => author.id === userID);
}

const All = ({ initialPosts, initialSelection }: { initialPosts: PostProps[], initialSelection: string }) => {
  const router = useRouter();
  const { selection } = router.query;

  const [currentSelection, setCurrentSelection] = useState<string>(initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await axios.get('/api/getPostsByFilter', {
        params: { tag: currentSelection }
      });
      setFilteredPosts(response.data);
    };

    fetchFilteredPosts();
  }, [currentSelection]);

  // 當 currentSelection 改變時更新 URL
  useEffect(() => {
    if (selection !== currentSelection) {
      router.push(`/News/All/${currentSelection}`, undefined, { shallow: true });
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
          <p className="text-center font-bold text-xl leading-[24.38px] sm:text-[28px] sm:leading-[42px]">
            Posters
          </p>

          {/* 標籤 */}
          <div className="flex justify-center">
            <Radio.Group name="tags" className="flex gap-4" selectedValue={currentSelection} onChange={(value) => {
              setCurrentSelection(value);
              router.push(`/News/All/${value}`);
            }}>
              {
                Tags.Post.map((tag, idx) => (
                  <Radio.Btn
                    key={idx}
                    text={tag}
                    value={tag}
                    id = { tag }
                    onChange={(value: string) => setCurrentSelection(value)}
                    className="text-xs py-1 px-3"
                  />
                ))
              }
            </Radio.Group>
          </div>
        </div>
        <div>
          <PostList data={filteredPosts} />
        </div>
      </div>
    </>
  );
}

// 設置靜態路徑
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Tags.News.map(tag => ({
    params: { selection: tag }
  }));

  // 添加默认路径
  paths.push({ params: { selection: 'default' } });

  return { paths, fallback: 'blocking' };
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const { selection } = context.params as { selection: string };
  const tag = selection === 'default' ? Tags.News[0] : Array.isArray(selection) ? selection[0] : selection;

  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);
  let initialPosts: PostProps[] = [];

  authorDirs.forEach((userID) => {
    const articlesDirectory = join(basePath, userID);
    const fileNames = readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));

    fileNames.forEach((fileName) => {
      const filePath = join(articlesDirectory, fileName);
      const fileContents = readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (data.tags.includes(tag)) {
        initialPosts.push({ ...data, id: fileName.replace(/\.mdx$/, '') } as PostProps);
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
