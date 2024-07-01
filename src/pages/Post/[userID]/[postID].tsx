import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { readFileSync } from 'fs';
import { MarkDownProps } from "@/types/User/UserID";
import { PostProps } from '@/types/List/PostData';
import Navbar from "@/components/Layout/Navbar";
import ArticalLayout from "@/components/Layout/Artical/AriticalLayout";
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import HorizontalLine from "@/components/HorizontalLine";
import ArticalPostList from "@/components/List/ArticalPostList";
import { useEffect, useState } from "react";
import axios from "axios";

const PostPage = ({ post }: MarkDownProps) => {
  // 如果 postID 沒有是 undefined，就出現 404 頁面
  const router = useRouter();
  const { postID } = router.query;

  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

  // 如果不是 Post 就跳轉到 News 頁面
  useEffect(() => {
    if (!post.frontMatter.type.includes('Post'))
      router.push(`/Tag/News/${post.frontMatter.authorData.id}/${postID}`);
  }, [post.frontMatter.type, postID]);

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    if (post.frontMatter.tags && postID) {
      const fetchRelatedPosts = async () => {
        const response = await axios.get('/api/getRelatedPosts', {
          params: {
            tag: JSON.stringify(post.frontMatter.tags), // 將 tags 轉換為 JSON 字串
            exclude: `${post.frontMatter.authorData.id}/${postID}`
          }
        });
        setRelatedPosts(response.data);
      };

      fetchRelatedPosts();
    }
  }, [postID, post.frontMatter.tags]);


  if (postID === 'undefined' || postID === undefined) {
    return (
      <NotFoundPage />
    )
  } else {
    const date = new Date(post.frontMatter.date);

    return (
      <article>
        <Navbar></Navbar>
        <div className="mx-auto sm:px-28">
          <ArticalLayout className='pt-10 px-5 sm:px-0'>
            {/* 標題 */}
            <h1 className="mb-2 text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{post.frontMatter.title}</h1>

            {/* 描述 */}
            <p className="mb-3 text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{post.frontMatter.description}</p>

            {/* 內容 */}
            <MD>
              {post.source}
            </MD>

            {/* TAG */}
            <div className="mt-2 mb-5 flex gap-2">
              {
                post.frontMatter.tags.map((item, index) => (
                  <Tag
                    key={index}
                    text={item}
                    type={["Post"]}
                    className="text-xs py-1 px-3"
                  />
                ))
              }
            </div>

            {/* 日期 */}
            <div className="text-sm font-medium leading-5 dark:text-neutral-white">
              {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
              &nbsp;
              {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
              &nbsp;
              {date.getHours() > 12 ? 'PM' : 'AM'}
            </div>

            <HorizontalLine className="my-5" />
            <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">More Posts</p>
            <ArticalPostList data={relatedPosts} />
          </ArticalLayout>
        </div>
      </article>
    );
  }
};

export async function getStaticPaths() {
  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);

  const paths = authorDirs.flatMap((userID) => {
    const articlesDirectory = join(basePath, userID);
    return readdirSync(articlesDirectory)
      .filter((file) => file.endsWith('.mdx'))
      .map((fileName) => ({
        params: { userID, postID: fileName.replace(/\.mdx$/, '') },
      }));
  });

  return { paths, fallback: 'blocking' };
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userID = params?.userID;
  const postID = params?.postID;

  if (!userID || !postID) {
    return { notFound: true };
  }

  const filePath = join(process.cwd(), `src/Articals/${userID}/${postID}.mdx`);
  const fileContents = readFileSync(filePath, 'utf8');

  const { content, data } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      post: {
        source: mdxSource,
        frontMatter: {
          ...data,
          authorData: { id: userID, ...data.authorData }
        } as PostProps,
      },
    },
  };
};

export default PostPage;
