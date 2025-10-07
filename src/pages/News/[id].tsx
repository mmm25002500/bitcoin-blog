import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import axios from "axios";
import type { MarkDownDataProps, MarkDownProps } from "@/types/User/UserID";
import type { PostProps } from "@/types/List/PostData";
import Navbar from "@/components/Layout/Navbar";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import HorizontalLine from "@/components/HorizontalLine";
import ArticleNewsList from "@/components/List/ArticleNewsList";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SEO from "@/config/SEO.json";
import SiteConfig from "@/config/SiteConfig.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import blockImg from "@/icons/examplePhoto/block.jpg";
import right from "@/icons/right.svg";
import left from "@/icons/left.svg";
import { getBaseUrl } from "@/lib/utils";

const NewsPage = ({
  initialPost,
  authorData,
}: MarkDownProps & {
  initialPost: MarkDownDataProps;
  authorData: {
    id: string;
    name: string;
    image: string;
    // Add other fields as needed based on your author data structure
  };
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 68) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (initialPost?.frontMatter?.tags && id) {
      const fetchRelatedPosts = async () => {
        const response = await axios.get("/api/getRelatedPosts", {
          params: {
            tag: JSON.stringify(initialPost.frontMatter.tags),
            exclude: id,
            mode: "News",
          },
        });
        setRelatedPosts(response.data);
      };

      fetchRelatedPosts();
    }
  }, [id, initialPost?.frontMatter?.tags]);

  if (!initialPost || id === "undefined" || id === undefined) {
    return <NotFoundPage />;
  }

  const date = initialPost?.frontMatter?.date
    ? new Date(initialPost.frontMatter.date)
    : null;

  return (
    <>
      <Head>
        <title>{initialPost.frontMatter.title}</title>
        <meta
          name="description"
          content={initialPost.frontMatter.description}
        />
        <meta
          property="og:title"
          content={`${initialPost.frontMatter.title}`}
        />
        <meta
          property="og:description"
          content={initialPost.frontMatter.description}
        />
        <meta property="og:image" content={initialPost.frontMatter.image} />
        <meta property="og:type" content={SEO.News.type} />
        <meta
          name="twitter:title"
          content={`${initialPost.frontMatter.description}`}
        />
        <meta
          name="twitter:description"
          content={initialPost.frontMatter.description}
        />
        <meta name="twitter:image" content={initialPost.frontMatter.image} />
      </Head>
      <article>
        <div
          className={`top-0 w-full z-50 ${scrolled ? "fixed bg-navbar-scrolled" : "bg-navbar-default"}`}
        >
          <Navbar scrolled={scrolled} />
        </div>
        <div className={`${scrolled ? "h-16" : ""}`} />

        <div className="mx-auto sm:px-28 w-full lg:w-[1280px]">
          <ArticleLayout className="pt-10 px-5 sm:px-0">
            {/* 內文 */}
            <h1 className="mb-2 text-3xl sm:text-[45px] leading-[30px] sm:leading-[48px] font-bold">
              {initialPost.frontMatter.title}
            </h1>
            <p className="mb-3 text-base sm:text-2xl leading-[22px] sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">
              {initialPost.frontMatter.description}
            </p>
            {initialPost.frontMatter.image && (
              <div className="flex justify-center">
                <Image
                  src={initialPost.frontMatter.image}
                  alt={initialPost.frontMatter.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                />
              </div>
            )}
            <MD>{initialPost.source}</MD>
            <div className="mt-2 mb-5 flex gap-2">
              {/* 標籤 */}
              <div className="relative w-full h-10 my-5">
                <div className="relative">
                  <div className="px-8 sm:px-0">
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={20}
                      freeMode={true}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      modules={[FreeMode, Navigation]}
                      className="w-full h-8"
                    >
                      {initialPost.frontMatter.tags?.map((tag) => (
                        <SwiperSlide key={tag} className="!w-auto">
                          <Tag
                            key={tag}
                            text={tag}
                            type={["News"]}
                            className="text-xs py-1 px-3"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* 左右箭頭 */}
                  <div className="swiper-button-prev absolute left-0 sm:-left-8 top-1/2 transform -translate-y-1/2 z-0">
                    <Image
                      src={left}
                      alt="Icon Dark"
                      width={1000}
                      height={1000}
                      className="rounded-full w-5 h-5 dark:invert"
                    />
                  </div>
                  <div className="swiper-button-next absolute right-0 sm:-right-8 top-1/2 transform -translate-y-1/2 z-0">
                    <Image
                      src={right}
                      alt="Icon Dark"
                      width={1000}
                      height={1000}
                      className="rounded-full w-5 h-5 dark:invert"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 作者 */}
            <button
              type="button"
              onClick={() => router.push(`/Author/${authorData.id}`)}
              className="flex gap-2 items-center my-4"
            >
              {/* 頭貼 */}
              <div>
                <Image
                  src={authorData.image}
                  alt="Author Image"
                  width={1000}
                  height={1000}
                  className="rounded-full w-6 h-6"
                />
              </div>
              {/* 名字 */}
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {authorData.name}
              </div>
              <div className="text-neutral-300">﹒</div>
              {/* 日期 */}
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {date && (
                  <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                    {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                    &nbsp;
                    {date.getHours() > 12
                      ? date.getHours() - 12
                      : date.getHours()}
                    :{date.getMinutes()}
                    &nbsp;
                    {date.getHours() > 12 ? "PM" : "AM"}
                  </div>
                )}
              </div>
            </button>
            <HorizontalLine className="my-9" />
            <Image src={blockImg} alt={""} />
            <HorizontalLine className="my-9" />
            <p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5 pt-8">
              更多新聞
            </p>
            <ArticleNewsList
              data={relatedPosts}
              increment={SiteConfig.ArticleNewsListMorePostPerclick}
            />
          </ArticleLayout>
        </div>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const id = params?.id;

  if (!id) {
    return { notFound: true };
  }

  try {
    // 從 API 取得文章 Markdown 內容
    const baseUrl = getBaseUrl();
    const response = await fetch(
      `${baseUrl}/api/getArticleMarkdown?id=${id}&type=News`,
    );

    if (!response.ok) {
      return { notFound: true };
    }

    const { content, data } = await response.json();

    // 使用 serialize 處理 Markdown
    const mdxSource = await serialize(content);

    // 取得作者資料
    const authorResponse = await fetch(`${baseUrl}/api/author/getAuthorByUID`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: data.author_id }),
    });

    if (!authorResponse.ok) {
      return { notFound: true };
    }

    const authorResult = await authorResponse.json();

    return {
      props: {
        initialPost: {
          source: mdxSource,
          frontMatter: data,
        },
        authorData: authorResult.data,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { notFound: true };
  }
};

export default NewsPage;
