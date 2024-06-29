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
      router.push(`/Post/All/${currentSelection}`, undefined, { shallow: true });
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
          <div className="my-5 flex justify-center">
            <Radio.Group name="tags" className="flex gap-4" selectedValue={currentSelection} onChange={(value) => {
              setCurrentSelection(value);
              router.push(`/Post/All/${value}`);
            }}>
              {
                Tags.Post.map((tag, idx) => (
                  <Radio.Btn
                    key={idx}
                    text={tag}
                    value={tag}
                    id={tag}
                    onChange={(value: string) => setCurrentSelection(value)}
                    className="text-xs py-1 px-3"
                  />
                ))
              }
            </Radio.Group>
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
  paths.push({ params: { selection: 'default' } });

  return { paths, fallback: 'blocking' };
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const selection = params?.selection || 'default';
  const tag = selection === 'default' ? Tags.Post[0] : selection;

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
