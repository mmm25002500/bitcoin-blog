import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
import SubscribeSection from "@/components/Page/SubscribeSection";
import { PostProps } from "@/types/List/PostData";
import { existsSync, readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import AuthorData from '@/config/Author.json';
import { MarkDownsProps } from "@/types/User/UserID";


// TODO:
// 1. 要把posts 傳入到 NewsSection 並製作出 Tag 顯示
// 2. posts 要以時間去排序

// 我们将使用这个类型来定义 posts 数组中每篇文章的结构
interface ExtendedPostProps extends PostProps {
  id: string;
  source: string; // 此属性将包含序列化后的 MDX 内容
}

const Home = ({ posts }: { posts: ExtendedPostProps[] }) => {
  console.log(posts);

  return (
    <>
      <Header></Header>
      <Navbar />
      <SwiperSection />
      <div className="mx-auto sm:px-16">
        <ButtonSection classname="py-8 px-8 sm:px-0" />
        <HorizontalLine />
        <NewsSection posts={[]} />
        <HorizontalLine />
        <ContactSection className="py-16 sm:px-5" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
      </div>
    </>
  )
}

// 通過使用者ID 獲取使用者資料
const getAuthorData = (userID: string) => {
  return AuthorData.filter((author) => author.id === userID);
}

export const getStaticProps: GetStaticProps = async () => {
  let allPosts: ExtendedPostProps[] = [];

  // 遍历每个作者目录来收集文章
  AuthorData.forEach(author => {
    const authorDirectory = join(process.cwd(), 'src/Articals', author.id);

    // 确保作者目录存在
    if (existsSync(authorDirectory)) {
      const fileNames = readdirSync(authorDirectory).filter(file => file.endsWith('.mdx'));

      fileNames.forEach(fileName => {
        const filePath = join(authorDirectory, fileName);
        const fileContents = readFileSync(filePath, 'utf8');
        const { content, data } = matter(fileContents);

        // 序列化 MDX 内容，这里仅示例，实际使用时可以根据需要处理
        // const mdxSource = await serialize(content, { scope: data });

        allPosts.push({
          id: fileName.replace(/\.mdx$/, ''),
          ...data as PostProps,
          source: content, // 这里我们存储原始的 MDX 内容或序列化后的内容
        });
      });
    }
  });

  // 按时间排序文章
  allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 返回排序后的文章列表作为 props
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default Home;
