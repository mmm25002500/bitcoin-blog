import ArticalLayout from "@/components/Layout/Artical/AriticalLayout";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { PostProps } from "@/types/Articals/Post";

interface TestProps {
  source: MDXRemoteSerializeResult;
  frontMatter: PostProps;
}

const Test = ({ source, frontMatter }: TestProps) => {
  return (
    <ArticalLayout className='pt-10 px-5 sm:px-0'>
      <p>標題：{ frontMatter.title }</p>
      <p>描述：{ frontMatter.description }</p>
      <p>日期：{ frontMatter.date }</p>
      <p>作者：{ frontMatter.author_id }</p>
      {/* 使用 MDXRemote 來渲染 MDX 內容 */}
      <MDXRemote {...source} />
    </ArticalLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = join(process.cwd(), 'src/Articals/Artical1.mdx');
  const fileContents = readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  // 注意：serialize 函數返回的是一個對象，而不是字符串
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      // 這裡直接傳遞 serialize 返回的對象
      source: mdxSource,
      frontMatter: data as PostProps
    },
  };
};

export default Test;
