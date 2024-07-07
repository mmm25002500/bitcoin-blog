import HorizontalLine from "@/components/HorizontalLine";
import Navbar from "@/components/Layout/Navbar";
import Avater from "@/components/User/Avater";
import { useRouter } from "next/router";
import AuthorData from '@/config/Author.json';
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon";

import DownIcon from '@/icons/down.svg';
import UpIcon from '@/icons/up.svg';
import Header from "@/components/Layout/Header";
import PostList from "@/components/List/PostList";

// import ArticalsData from '@/Articals/JohnCarter/Articals.json';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import { MarkDownsProps } from '@/types/User/UserID';

// 通過使用者ID 獲取使用者資料
const getAuthorData = (userID: string) => {
  return AuthorData.filter((author) => author.id === userID);
}

const AuthorPage = ({ posts }: MarkDownsProps) => {

  const router = useRouter();
  const { userID } = router.query;

  const [author, setAuthor] = useState({ fullname: '', name: '', description: '', image: '', id: '' });
  const [postQuantity, setPostQuantity] = useState(0);

  const [collaspe, setCollaspe] = useState(true);

  useEffect(() => {
    setAuthor(getAuthorData(userID as string)[0]);
  }, [userID]);

  // 計算文章數量
  useEffect(() => {
    setPostQuantity(posts.length);
  }, [posts]);

  // 以日期排序文章
  posts.sort((a, b) => {
    return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
  });

  return (
    <>
      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <HorizontalLine />
      <div className="mx-auto px-6 sm:px-28">
        <div className="flex gap-10 my-5">
          <div className="flex-none">
            <Avater
              src={author?.image}
              className=""
            />
          </div>
          <div className="w-full">
            <div className="flex flex-wrap sm:flex-nowrap sm:grid sm:grid-cols-1 gap-1">
              {/* 名字 */}
              <div className="flex-none font-semibold text-base leading-6 sm:font-bold sm:text-[28px] sm:leading-[42px] text-neutral-black dark:text-neutral-white">
                {author?.fullname}
              </div>
              <div className="flex-grow"></div>

              {/* 文章數量 */}
              <div className="flex-none font-medium text-sm leading-5 text-neutral-800 dark:text-neutral-200">
                {postQuantity} Posts
              </div>
            </div>

            <div className="flex flex-col">
              {/* 描述 */}
              <div className="flex-none col-span-2 sm:col-span-1 font-normal text-sm leading-6 text-neutral-900 dark:text-neutral-300 overflow-hidden">
                <p className={collaspe ? 'line-clamp-2' : ''}>
                  {author?.description}
                </p>
              </div>

              {/* 查看更多 按鈕 */}
              <div>
                <Button
                  onClick={() => setCollaspe(!collaspe)}
                  type={"large"}
                  className="dark:!border-neutral-white flex items-center gap-2">
                  {
                    collaspe ? (
                      <>
                        查看更多
                        <Icon
                          icon_light={DownIcon}
                          className="invert-0 dark:invert"
                        />
                      </>
                    ) : (
                      <>
                        收合
                        <Icon
                          icon_light={UpIcon}
                          className="invert-0 dark:invert"
                        />
                      </>
                    )
                  }

                </Button>
              </div>
            </div>
          </div>
        </div>
        <HorizontalLine />
      </div>
      <div className="mx-auto sm:px-28">
        <PostList
          data={posts.map((post) => ({
            title: post.frontMatter.title,
            description: post.frontMatter.description,
            tags: post.frontMatter.tags,
            date: post.frontMatter.date,
            authorData: {
              fullname: author.fullname,
              name: author.name,
              description: author.description,
              img: author.image,
              id: author.id,
            },
            type: post.frontMatter.type,
            img: post.frontMatter.img,
            image: post.frontMatter.image,
            id: post.frontMatter.id,
          }))}
        />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = AuthorData.map(author => ({ params: { userID: author.id } }));

  return { paths, fallback: 'blocking' };
}

// getStaticProps讀取目錄下所有 mdx 文件
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userID = params?.userID;

  if (!userID) {
    return {
      notFound: true,
    };
  }

  try {
    const articlesDirectory = join(process.cwd(), `src/Articals/${userID}`);
    const fileNames = readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));

    // 遍歷所有文件獲取內容
    const posts = await Promise.all(fileNames.map(async (fileName) => {
      const filePath = join(articlesDirectory, fileName);
      const fileContents = readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContents);
      const mdxSource = await serialize(content, { scope: data });
      const articleID = fileName.replace(/\.mdx$/, '');

      return {
        id: articleID,
        source: mdxSource,
        frontMatter: {
          ...data as PostProps,
          id: articleID
        }
      };
    }));

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error reading files:', error);

    // 回傳錯誤頁面或 fallback props
    return {
      notFound: true,
    };
  }
};

export default AuthorPage;
