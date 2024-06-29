import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { readFileSync } from 'fs';
import { MarkDownProps } from "@/types/User/UserID";
import { MDXRemote } from "next-mdx-remote";
import { PostProps } from '@/types/List/PostData';
import Navbar from "@/components/Layout/Navbar";
import ArticalLayout from "@/components/Layout/Artical/AriticalLayout";
import MD from "@/components/MD";

const PostPage = ({ post }: MarkDownProps) => {
  // 如果 postID 沒有是 undefined，就出現 404 頁面
  const router = useRouter();
  const { postID } = router.query;

  if (postID === 'undefined' || postID === undefined) {
    return (
      <NotFoundPage />
    )
  } else {
    return (
      <article>
        <Navbar></Navbar>
        <div className="mx-auto sm:px-28">
          <ArticalLayout className='pt-10 px-5 sm:px-0'>
            <h1 className="text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{post.frontMatter.title}</h1>
            <p className="text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{post.frontMatter.description}</p>
            <MD>
              {post.source}
            </MD>
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
        frontMatter: data as PostProps,
      },
    },
  };
};

export default PostPage;
