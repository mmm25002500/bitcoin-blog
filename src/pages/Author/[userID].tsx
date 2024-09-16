import HorizontalLine from "@/components/HorizontalLine";
import Navbar from "@/components/Layout/Navbar";
import Avater from "@/components/User/Avater";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon";
import useSWR from 'swr';

import DownIcon from '@/icons/down.svg';
import UpIcon from '@/icons/up.svg';
import Header from "@/components/Layout/Header";
import PostList from "@/components/List/PostList";

import { GetServerSideProps } from 'next';
import { PostProps } from '@/types/List/PostData';
import Head from "next/head";
import { initAdmin } from "lib/firebaseAdmin";
import Image from 'next/image';

// 取得作者資料
const getAuthorData = async () => {
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const authorFile = bucket.file('config/Author.json');
  const authorFileContents = (await authorFile.download())[0].toString('utf8');
  return JSON.parse(authorFileContents);
};

// fetcher 函數
const fetcher = (url: string) => fetch(url).then(res => res.json());

const AuthorPage = (props: {
  initialPosts: PostProps[]; initialSEO: any, initialAuthor: any
}) => {
  const [postQuantity, setPostQuantity] = useState(0);
  const [collaspe, setCollaspe] = useState(true);

  const { data: posts, error } = useSWR(`/api/getPostsByFilter?type=both&author=${props.initialAuthor.id}&tag=all`, fetcher, { fallbackData: props.initialPosts });

  // 計算文章數量
  useEffect(() => {
    if (posts) {
      setPostQuantity(posts.length);
    }
  }, [posts]);

  // 按照日期排序
  posts && posts.sort((a: PostProps, b: PostProps) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <Head>
        <title>{props.initialAuthor.name} - {props.initialSEO.Author.title}</title>
        <meta name="description" content={props.initialSEO.Author.description} />
        <meta property="og:title" content={`${props.initialAuthor.name} - ${props.initialSEO.Author.title}`} />
        <meta property="og:description" content={props.initialSEO.Author.description} />
        <meta property="og:image" content={props.initialSEO.Author.image} />
        <meta property="og:type" content={props.initialSEO.Author.type} />
        <meta name="twitter:title" content={`${props.initialAuthor.name} - ${props.initialSEO.Author.title}`} />
        <meta name="twitter:description" content={props.initialSEO.Author.description} />
        <meta name="twitter:image" content={props.initialSEO.Author.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <div className="sm:mx-auto sm:px-16">
        <Navbar />
      </div>
      <HorizontalLine />
      <div className="mx-auto px-4 md:px-28 w-full lg:w-[60%]">
        <div className="flex gap-10 my-5">
          <div className="flex-none ml-2">
            <Image
              src={props.initialAuthor?.image}
              className="rounded-full w-[50px] h-[50px]"
              alt={""}
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-full">
            <div className="flex flex-wrap sm:flex-nowrap sm:grid sm:grid-cols-1 gap-1">
              {/* 名字 */}
              <div className="flex-none font-semibold text-base leading-6 sm:font-bold sm:text-[28px] sm:leading-[42px] text-neutral-black dark:text-neutral-white">
                {props.initialAuthor?.fullname}
              </div>
              <div className="flex-grow"></div>

              {/* 文章數量 */}
              <div className="flex-none font-medium text-sm leading-5 text-neutral-800 dark:text-neutral-200 mr-2">
                {postQuantity} Posts
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* 描述 */}
              <div className="flex-none col-span-2 sm:col-span-1 font-normal text-sm leading-6 text-neutral-900 dark:text-neutral-300 overflow-hidden">
                <p className={collaspe ? 'line-clamp-2' : ''}>
                  {props.initialAuthor?.description}
                </p>
              </div>

              {/* 查看更多 按鈕 */}
              <div>
                <Button
                  onClick={() => setCollaspe(!collaspe)}
                  type={"small"}
                  className="dark:!border-neutral-white flex items-center gap-2 text-[10px] px-3">
                  {collaspe ? (
                    <>
                      更多
                      <Icon icon_light={DownIcon} className="w-3 h-3 invert-0 dark:invert" />
                    </>
                  ) : (
                    <>
                      收合
                      <Icon icon_light={UpIcon} className="w-3 h-3 invert-0 dark:invert" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <HorizontalLine />
      </div>
      <div className="mx-auto md:px-28 w-full lg:w-[60%]">
        {
          posts && <PostList
            data={posts.map((post: PostProps) => ({
              title: post.title,
              description: post.description,
              tags: post.tags,
              date: post.date,
              authorData: {
                fullname: post.authorData.fullname,
                name: post.authorData.name,
                description: post.authorData.description,
                image: post.authorData.image,
                id: post.authorData.id,
              },
              type: post.type[0],
              img: props.initialAuthor.image,
              image: post.image,
              id: post.id,
            })) as any}
          />
        }
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userID = params?.userID;

  if (!userID) {
    return {
      notFound: true,
    };
  }

  try {
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    const authorData = await getAuthorData();
    const author = authorData.find((author: any) => author.id === userID);

    if (!author) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialSEO: seoData,
        initialAuthor: author,
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
