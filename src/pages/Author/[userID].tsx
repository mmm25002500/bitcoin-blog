import HorizontalLine from "@/components/HorizontalLine";
import Navbar from "@/components/Layout/Navbar";
import Avater from "@/components/User/Avater";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon";

import DownIcon from '@/icons/down.svg';
import UpIcon from '@/icons/up.svg';
import Header from "@/components/Layout/Header";
import PostList from "@/components/List/PostList";

import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PostProps } from '@/types/List/PostData';
import Head from "next/head";
import { initAdmin } from "lib/firebaseAdmin";

// 获取作者数据
const getAuthorData = async () => {
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const authorFile = bucket.file('config/Author.json');
  const authorFileContents = (await authorFile.download())[0].toString('utf8');
  return JSON.parse(authorFileContents);
};

const AuthorPage = (props: {posts: PostProps[], seo: any, author: any}) => {

  const [postQuantity, setPostQuantity] = useState(0);
  const [collaspe, setCollaspe] = useState(true);

  // 計算文章數量
  useEffect(() => {
    setPostQuantity(props.posts.length);
  }, [props.posts]);

  console.log(props.posts);

  // 按照日期排序
  props.posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <Head>
        <title>{props.author.name} - {props.seo.Author.title}</title>
        <meta name="description" content={props.seo.Author.description} />
        <meta property="og:title" content={`${props.author.name} - ${props.seo.Author.title}`} />
        <meta property="og:description" content={props.seo.Author.description} />
        <meta property="og:image" content={props.seo.Author.image} />
        <meta property="og:type" content={props.seo.Author.type} />
        <meta name="twitter:title" content={`${props.author.name} - ${props.seo.Author.title}`} />
        <meta name="twitter:description" content={props.seo.Author.description} />
        <meta name="twitter:image" content={props.seo.Author.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <HorizontalLine />
      <div className="mx-auto px-6 sm:px-28">
        <div className="flex gap-10 my-5">
          <div className="flex-none">
            <Avater src={props.author?.image} className="" />
          </div>
          <div className="w-full">
            <div className="flex flex-wrap sm:flex-nowrap sm:grid sm:grid-cols-1 gap-1">
              {/* 名字 */}
              <div className="flex-none font-semibold text-base leading-6 sm:font-bold sm:text-[28px] sm:leading-[42px] text-neutral-black dark:text-neutral-white">
                {props.author?.fullname}
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
                  {props.author?.description}
                </p>
              </div>

              {/* 查看更多 按鈕 */}
              <div>
                <Button onClick={() => setCollaspe(!collaspe)} type={"large"} className="dark:!border-neutral-white flex items-center gap-2">
                  {collaspe ? (
                    <>
                      查看更多
                      <Icon icon_light={DownIcon} className="invert-0 dark:invert" />
                    </>
                  ) : (
                    <>
                      收合
                      <Icon icon_light={UpIcon} className="invert-0 dark:invert" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <HorizontalLine />
      </div>
      <div className="mx-auto sm:px-28">
        <PostList
          data={props.posts.map((post) => ({
            title: post.title,
            description: post.description,
            tags: post.tags,
            date: post.date,
            authorData: {
              fullname: props.author.fullname,
              name: props.author.name,
              description: props.author.description,
              img: props.author.image,
              id: props.author.id,
            },
            type: post.type,
            img: post.img,
            image: post.image,
            id: post.id,
          }))}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authorData = await getAuthorData();
  const paths = authorData.map((author: any) => ({ params: { userID: author.id } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userID = params?.userID;

  if (!userID) {
    return {
      notFound: true,
    };
  }

  try {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.HOST || 'localhost:3000';

    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    const markdownApiUrl = `${protocol}://${host}/api/getPostsByFilter?type=both&author=${userID}&tag=all`;
    const markdownRes = await fetch(markdownApiUrl);
    if (!markdownRes.ok) {
      return { notFound: true };
    }
    const posts = await markdownRes.json();
    const authorData = await getAuthorData();
    const author = authorData.find((author: any) => author.id === userID);

    return {
      props: {
        posts,
        seo: seoData,
        author,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true,
    };
  }
};

export default AuthorPage;
