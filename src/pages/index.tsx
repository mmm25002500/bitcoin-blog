import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
import SubscribeSection from "@/components/Page/SubscribeSection";
import { existsSync, readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import { join } from "path";
import AuthorData from '@/config/Author.json';
import { NewsPostProps, NewsProps } from "@/types/User/UserID";


// TODO:
// 1. posts 要以時間去排序

const Home = ({ posts }: NewsProps) => {
  console.log(posts);

  return (
    <>
      <Header></Header>
      <Navbar />
      <SwiperSection />
      <div className="mx-auto sm:px-16">
        <ButtonSection classname="py-8 px-8 sm:px-0" />
        {/* <HorizontalLine /> */}
        <NewsSection posts={posts} />
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
  let allPosts: NewsPostProps[] = [];

  // 遍歷所有作者
  AuthorData.forEach(author => {
    const authorDirectory = join(process.cwd(), 'src/Articals', author.id);

    // 如果作者目錄存在，則讀取所有文章
    if (existsSync(authorDirectory)) {
      const fileNames = readdirSync(authorDirectory).filter(file => file.endsWith('.mdx'));

      fileNames.forEach(fileName => {
        const filePath = join(authorDirectory, fileName);
        const fileContents = readFileSync(filePath, 'utf8');
        const { content, data } = matter(fileContents);

        allPosts.push({
          id: fileName.replace(/\.mdx$/, ''),
          title: data.title,
          description: data.description,
          tags: data.tags,
          date: data.date,
          source: content,
          authorData: getAuthorData(author.id)[0],
          img: data.img,
          image: data.image,
        });
      });
    }


  });

  // 按日期排序所有文章
  allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });



  // 返回所有文章
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default Home;
