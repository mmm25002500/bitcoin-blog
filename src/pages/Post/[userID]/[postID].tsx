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
import ArticlePostList from "@/components/List/ArticlePostList";
import { useEffect, useState } from "react";
import Head from "next/head";
import { initAdmin } from '../../../../lib/firebaseAdmin';

const PostPage = ({ post, seo, ArticlePostListMorePostPerclick }: MarkDownProps & { seo: any, ArticlePostListMorePostPerclick: number }) => {
  const router = useRouter();
  const { postID } = router.query;

  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (!post.frontMatter.type.includes('Post'))
      router.push(`/News/${post.frontMatter.authorData.id}/${postID}`);
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
        {/*
        <Head>
          <title>{post.frontMatter.title} - { seo.Post.title }</title>
          <meta name="description" content={post.frontMatter.description} />
          <meta property="og:title" content={`${post.frontMatter.title} - ${seo.Post.title}`} />
          <meta property="og:description" content={post.frontMatter.description} />
          <meta property="og:image" content={post.frontMatter.image} />
          <meta property="og:type" content={ seo.Post.type } />
          <meta name="twitter:title" content={`${post.frontMatter.description} - ${seo.Post.title}`} />
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
                  <Tag key={index} text={item} type={["Post"]} className="text-xs py-1 px-3" />
                ))}
              </div>
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                &nbsp;
                {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                &nbsp;
                {date.getHours() > 12 ? 'PM' : 'AM'}
              </div>
              <HorizontalLine className="my-5" />
              <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">More Posts</p>
              <ArticlePostList
                data={relatedPosts}
                ArticlePostListMorePostPerclick={ArticlePostListMorePostPerclick}
              />
            </ArticleLayout>
          </div>
        </article>
        */}
      </>
    );
  }
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_LOCAL_URL;
//   const apiUrl = `${host}/api/getPostsByFilter?type=Post&author=all&tag=all`;

//   const res = await fetch(apiUrl);
//   const posts = await res.json();

//   const paths = posts.map((post: PostProps) => ({
//     params: { userID: post.authorData?.id, postID: post.id }
//   }));

//   return { paths, fallback: 'blocking' };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;
//   const userID = params?.userID;
//   const postID = params?.postID;

//   if (!userID || !postID) {
//     return { notFound: true };
//   }

//   const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_LOCAL_URL;
//   const apiUrl = `${host}/api/getArticleMarkdown?userID=${userID}&postID=${postID}`;

//   try {
//     // 獲取文章內容
//     const res = await fetch(apiUrl);
//     if (!res.ok) {
//       return { notFound: true };
//     }
//     const { content, data } = await res.json();
//     const mdxSource = await serialize(content);

//     // 獲取作者資料
//     const app = await initAdmin();
//     const bucket = app.storage().bucket();
//     const seoFile = bucket.file('config/SEO.json');
//     const seoFileContents = (await seoFile.download())[0].toString('utf8');
//     const seoData = JSON.parse(seoFileContents);

//     // 獲取SiteConfig
//     const siteConfigFile = bucket.file('config/SiteConfig.json');
//     const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
//     const siteConfigData = JSON.parse(siteConfigFileContents);
//     const ArticlePostListMorePostPerclick = siteConfigData.ArticlePostListMorePostPerclick

//     return {
//       props: {
//         post: {
//           source: mdxSource,
//           frontMatter: {
//             ...data,
//             authorData: { id: userID, ...data.authorData }
//           } as PostProps,
//         },
//         seo: seoData,
//         ArticlePostListMorePostPerclick
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching article content or SEO data:', error);
//     return { notFound: true };
//   }
// };

export default PostPage;
