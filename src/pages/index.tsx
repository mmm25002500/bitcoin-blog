import ButtonSection from "@/components/HomePage/ButtonSection";
import NewsSection from "@/components/HomePage/NewsSection";
import SwiperSection from "@/components/HomePage/SwiperSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
import SubscribeSection from "@/components/Page/SubscribeSection";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps } from 'next';
import { join } from "path";
import AuthorData from '@/config/Author.json';
import { PostProps } from '@/types/List/PostData';
import { NewsPostProps } from "@/types/HomePage/NewsSection";
import Head from "next/head";
import SEO from "@/config/SEO.json";

const Home = (props: NewsPostProps) => {
  return (
    <>
      <Head>
        <title>{SEO.Index.title}</title>
        <meta name="description" content={SEO.Index.description} />
        <meta property="og:title" content={SEO.Index.title} />
        <meta property="og:description" content={SEO.Index.description} />
        <meta property="og:image" content={SEO.Index.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Index.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Index.title} />
        <meta name="twitter:description" content={SEO.Index.description} />
        <meta name="twitter:image" content={SEO.Index.image} />
      </Head>

      <Header></Header>
      <Navbar />
      <SwiperSection />
      <div className="sm:mx-auto sm:px-16 mx-8">
        <ButtonSection classname="py-8" />
        <HorizontalLine />
        <NewsSection
          initialPosts={props.initialPosts}
          initialSelection={props.initialSelection} />
        <HorizontalLine />
        <ContactSection className="py-16" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
      </div>
    </>
  )
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const selection = context.params?.selection || "all";

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

export default Home;
