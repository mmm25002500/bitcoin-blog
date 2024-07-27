import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import axios from "axios";
import matter from 'gray-matter';
import { MarkDownProps } from "@/types/User/UserID";
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
import Image from 'next/image';

const PostPage = ({ post, seo, authorData, ArticleNewsListMorePostPerclick }: MarkDownProps & { seo: any, authorData: any, ArticleNewsListMorePostPerclick: number }) => {
  const router = useRouter();
  const { postID } = router.query;

  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (!post.frontMatter.type.includes('News'))
      router.push(`/Post/${post.frontMatter.authorData.id}/${postID}`);
  }, [post.frontMatter.type, postID, router, post.frontMatter.authorData.id]);

  useEffect(() => {
    if (post.frontMatter.tags && postID) {
      const fetchRelatedPosts = async () => {
        const response = await axios.get('/api/getRelatedPosts', {
          params: {
            tag: JSON.stringify(post.frontMatter.tags),
            exclude: `${post.frontMatter.authorData.id}/${postID}`
          }
        });
        setRelatedPosts(response.data);
      };

      fetchRelatedPosts();
    }
  }, [postID, post.frontMatter.tags, post.frontMatter.authorData.id]);

  if (postID === 'undefined' || postID === undefined) {
    return <NotFoundPage />;
  } else {
    const date = new Date(post.frontMatter.date);

    return (
      <>
        <Head>
          <title>{post.frontMatter.title} - { seo.News.title }</title>
          <meta name="description" content={post.frontMatter.description} />
          <meta property="og:title" content={`${post.frontMatter.title} - ${seo.News.title}`} />
          <meta property="og:description" content={post.frontMatter.description} />
          <meta property="og:image" content={post.frontMatter.image} />
          <meta property="og:type" content={ seo.News.type } />
          <meta name="twitter:title" content={`${post.frontMatter.description} - ${seo.News.title}`} />
          <meta name="twitter:description" content={post.frontMatter.description} />
          <meta name="twitter:image" content={post.frontMatter.image} />
        </Head>
        <article>
          <Navbar />
          <div className="mx-auto sm:px-28">
            <ArticleLayout className='pt-10 px-5 sm:px-0'>
              <h1 className="mb-2 text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{post.frontMatter.title}</h1>
              <p className="mb-3 text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{post.frontMatter.description}</p>
              <MD>{post.source}</MD>
              <div className="mt-2 mb-5 flex gap-2">
                {post.frontMatter.tags.map((item, index) => (
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
                  {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                  &nbsp;
                  {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                  &nbsp;
                  {date.getHours() > 12 ? 'PM' : 'AM'}
                </div>
              </div>
              <HorizontalLine className="my-5" />
              <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">More Posts</p>
              <ArticleNewsList
                data={relatedPosts}
                ArticleNewsListMorePostPerclick={ArticleNewsListMorePostPerclick}
              />
            </ArticleLayout>
          </div>
        </article>
      </>
    );
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.HOST || 'localhost:3000';
  const apiUrl = `${protocol}://${host}/api/getPostsByFilter?type=News&author=all&tag=all`;

  const res = await fetch(apiUrl);
  const posts = await res.json();

  const paths = posts.map((post: PostProps) => ({
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

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.HOST || 'localhost:3000';
  const articleApiUrl = `${protocol}://${host}/api/getArticleMarkdown?userID=${userID}&postID=${postID}`;
  const authorApiUrl = `${protocol}://${host}/api/getAuthorConfig`;

  try {
    // 獲取文章內容
    const articleRes = await fetch(articleApiUrl);
    if (!articleRes.ok) {
      return { notFound: true };
    }
    const { content, data } = await articleRes.json();
    const mdxSource = await serialize(content);

    // 獲取SEO配置
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    // 獲取作者資料
    const authorRes = await fetch(authorApiUrl);
    if (!authorRes.ok) {
      return { notFound: true };
    }
    const authorData = await authorRes.json();
    const author = authorData.find((author: any) => author.id === userID);

    // 獲取 SiteConfig
    const siteConfigFile = bucket.file('config/SiteConfig.json');
    const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
    const siteConfigData = JSON.parse(siteConfigFileContents);
    const ArticleNewsListMorePostPerclick = siteConfigData.ArticleNewsListMorePostPerclick;

    return {
      props: {
        post: {
          source: mdxSource,
          frontMatter: {
            ...data,
            authorData: { id: userID, ...data.authorData }
          } as PostProps,
        },
        seo: seoData,
        authorData: author,
        ArticleNewsListMorePostPerclick
      },
    };
  } catch (error) {
    console.error('Error fetching article content or SEO/author data:', error);
    return { notFound: true };
  }
};

export default PostPage;
