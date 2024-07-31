import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import axios from "axios";
import { MarkDownDataProps, MarkDownProps } from "@/types/User/UserID";
import { PostProps } from '@/types/List/PostData';
import Navbar from "@/components/Layout/Navbar";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import HorizontalLine from "@/components/HorizontalLine";
import ArticleNewsList from "@/components/List/ArticleNewsList";
import { useEffect, useState } from "react";
import Head from "next/head";
import { initAdmin } from '../../../../lib/firebaseAdmin';
import matter from 'gray-matter';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsPage = ({ initialPost, seo, authorData, ArticleNewsListMorePostPerclick }: MarkDownProps & { initialPost: MarkDownDataProps, seo: any, authorData: any, ArticleNewsListMorePostPerclick: number }) => {
  const router = useRouter();
  const { postID, userID } = router.query;

  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (initialPost?.frontMatter?.tags && postID) {
      const fetchRelatedPosts = async () => {
        const response = await axios.get('/api/getRelatedPosts', {
          params: {
            tag: JSON.stringify(initialPost.frontMatter.tags),
            exclude: `${userID}/${postID}`
          }
        });
        setRelatedPosts(response.data);
      };

      fetchRelatedPosts();
    }
  }, [postID, initialPost?.frontMatter?.tags, userID]);

  // 如果是Post文章
  useEffect(() => {
    if (!initialPost?.frontMatter?.type.includes('News'))
      router.push(`/Post/${userID}/${postID}`);
  }, [initialPost?.frontMatter?.type, postID, router, userID]);

  if (!initialPost || postID === 'undefined' || postID === undefined) {
    return <NotFoundPage />;
  }

  const date = initialPost?.frontMatter?.date ? new Date(initialPost.frontMatter.date) : null;

  return (
    <>
      <Head>
        <title>{initialPost.frontMatter.title} - {seo.News.title}</title>
        <meta name="description" content={initialPost.frontMatter.description} />
        <meta property="og:title" content={`${initialPost.frontMatter.title} - ${seo.News.title}`} />
        <meta property="og:description" content={initialPost.frontMatter.description} />
        <meta property="og:image" content={initialPost.frontMatter.image} />
        <meta property="og:type" content={seo.News.type} />
        <meta name="twitter:title" content={`${initialPost.frontMatter.description} - ${seo.News.title}`} />
        <meta name="twitter:description" content={initialPost.frontMatter.description} />
        <meta name="twitter:image" content={initialPost.frontMatter.image} />
      </Head>
      <article>
        <Navbar />
        <div className="mx-auto sm:px-28">
          <ArticleLayout className='pt-10 px-5 sm:px-0'>
            <h1 className="mb-2 text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{initialPost.frontMatter.title}</h1>
            <p className="mb-3 text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{initialPost.frontMatter.description}</p>
            <MD>{initialPost.source}</MD>
            <div className="mt-2 mb-5 flex gap-2">
              {initialPost.frontMatter.tags.map((item: string, index: number) => (
                <Tag key={index} text={item} type={["News"]} className="text-xs py-1 px-3" />
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  src={authorData.image}
                  alt="Author Image"
                  width={1000}
                  height={1000}
                  className="rounded-full w-10 h-10"
                />
              </div>
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {authorData.name}
              </div>
              <div className="text-neutral-300">﹒</div>
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {date && (
                  <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                    {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                    &nbsp;
                    {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                    &nbsp;
                    {date.getHours() > 12 ? 'PM' : 'AM'}
                  </div>
                )}
              </div>
            </div>
            <HorizontalLine className="my-5" />
            <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">More News</p>
            <ArticleNewsList
              data={relatedPosts}
              increment={ArticleNewsListMorePostPerclick}
            />
          </ArticleLayout>
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const seoFile = bucket.file('config/SEO.json');
  const seoFileContents = (await seoFile.download())[0].toString('utf8');

  let seoData;
  try {
    seoData = JSON.parse(seoFileContents);
  } catch (error) {
    console.error('Error parsing SEO file:', error);
    return { paths: [], fallback: 'blocking' };
  }

  if (!seoData.posts || !Array.isArray(seoData.posts)) {
    console.error('SEO data does not contain posts or posts is not an array');
    return { paths: [], fallback: 'blocking' };
  }

  const paths = seoData.posts.map((post: PostProps) => ({
    params: { userID: post.authorData?.id, postID: post.id }
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userID = params?.userID;
  const postID = params?.postID;

  if (!userID || !postID) {
    return { notFound: true };
  }

  const app = await initAdmin();
  const bucket = app.storage().bucket();

  // Fetch SEO data
  const seoFile = bucket.file('config/SEO.json');
  const seoFileContents = (await seoFile.download())[0].toString('utf8');
  const seoData = JSON.parse(seoFileContents);

  // Fetch SiteConfig data
  const siteConfigFile = bucket.file('config/SiteConfig.json');
  const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
  const siteConfigData = JSON.parse(siteConfigFileContents);
  const ArticleNewsListMorePostPerclick = siteConfigData.ArticleNewsListMorePostPerclick;

  // Fetch initial post data
  const postFile = bucket.file(`Article/${userID}/${postID}.mdx`);
  const [exists] = await postFile.exists();

  if (!exists) {
    return { notFound: true };
  }

  const postFileContents = (await postFile.download())[0].toString('utf8');
  const { content, data } = matter(postFileContents);
  const mdxSource = await serialize(content);

  // Fetch author data
  const authorFile = bucket.file('config/Author.json');
  const authorFileContents = (await authorFile.download())[0].toString('utf8');
  const authorData = JSON.parse(authorFileContents);
  const author = authorData.find((author: any) => author.id === userID);

  return {
    props: {
      initialPost: {
        source: mdxSource,
        frontMatter: data,
      },
      seo: seoData,
      authorData: author,
      ArticleNewsListMorePostPerclick,
    },
  };
};

export default NewsPage;
