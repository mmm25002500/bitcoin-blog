import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import axios from "axios";
import { MarkDownDataProps, MarkDownProps } from "@/types/User/UserID";
import { PostProps } from '@/types/List/PostData';
import Navbar from "@/components/Layout/Navbar";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import HorizontalLine from "@/components/HorizontalLine";
import ArticlePostList from "@/components/List/ArticlePostList";
import { useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { initAdmin } from '../../../../lib/firebaseAdmin';
import matter from 'gray-matter';

const PostPage = ({ initialPost, seo, ArticlePostListMorePostPerclick }: MarkDownProps & { initialPost: MarkDownDataProps, seo: any, ArticlePostListMorePostPerclick: number }) => {
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

  // 如果是新聞
  useEffect(() => {
    if (!initialPost?.frontMatter?.type.includes('Post'))
      router.push(`/News/${userID}/${postID}`);
  }, [initialPost?.frontMatter?.type, postID, router, userID]);

  if (!initialPost || postID === 'undefined' || postID === undefined) {
    return <NotFoundPage />;
  }

  const date = initialPost?.frontMatter?.date ? new Date(initialPost.frontMatter.date) : null;

  return (
    <>
      <Head>
        <title>{initialPost.frontMatter.title} - {seo.Post.title}</title>
        <meta name="description" content={initialPost.frontMatter.description} />
        <meta property="og:title" content={`${initialPost.frontMatter.title} - ${seo.Post.title}`} />
        <meta property="og:description" content={initialPost.frontMatter.description} />
        <meta property="og:image" content={initialPost.frontMatter.image} />
        <meta property="og:type" content={seo.Post.type} />
        <meta name="twitter:title" content={`${initialPost.frontMatter.description} - ${seo.Post.title}`} />
        <meta name="twitter:description" content={initialPost.frontMatter.description} />
        <meta name="twitter:image" content={initialPost.frontMatter.image} />
      </Head>
      <article>
        <Navbar />
        <div className="mx-auto sm:px-28">
          <ArticleLayout className='pt-10 px-5 sm:px-0'>
            <h1 className="mb-2 text-[22px] leading-[30px] sm:text-[34px] sm:leading-[48px] font-bold">{initialPost.frontMatter.title}</h1>
            <p className="mb-3 text-base leading-[22px] sm:text-[22px] sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{initialPost.frontMatter.description}</p>
            <MD>{initialPost.source}</MD>
            <div className="mt-2 mb-5 flex gap-2">
              {initialPost.frontMatter.tags.map((item: string, index: number) => (
                  <Tag key={index} text={item} type={["Post"]} className="text-xs py-1 px-3" />
                ))}
            </div>
            {date && (
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                &nbsp;
                {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                &nbsp;
                {date.getHours() > 12 ? 'PM' : 'AM'}
              </div>
            )}
            <HorizontalLine className="my-5" />
            <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">More Posts</p>
            <ArticlePostList
              data={relatedPosts}
              ArticlePostListMorePostPerclick={ArticlePostListMorePostPerclick}
            />
          </ArticleLayout>
        </div>
      </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const ArticlePostListMorePostPerclick = siteConfigData.ArticlePostListMorePostPerclick;

  // Fetch initial post data
  const postFile = bucket.file(`Article/${userID}/${postID}.mdx`);
  const [exists] = await postFile.exists();

  if (!exists) {
    return { notFound: true };
  }

  const postFileContents = (await postFile.download())[0].toString('utf8');
  const { content, data } = matter(postFileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      initialPost: {
        source: mdxSource,
        frontMatter: data,
      },
      seo: seoData,
      ArticlePostListMorePostPerclick,
    },
  };
};

export default PostPage;
