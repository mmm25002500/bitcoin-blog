import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { serialize } from 'next-mdx-remote/serialize';

// components
import Navbar from "@/components/Layout/Navbar";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import Sidebar from '@/components/Sidebar/MoreInfoSidebar';
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import NotFound from "@/components/NotFound/NotFound";
import HorizontalLine from "@/components/HorizontalLine";
import MoreInfoDrawer from "@/components/Drawer/MoreInfoDrawer";
import IconWithTextBtn from "@/components/Button/IconWithTextBtn";

// types
import { GetArticleLinkByFileName } from "@/types/API/getArticleLinkByFileName";
import { categoryData } from "@/types/MoreInfo/MoreInfo";
import { MoreInfoData } from '@/types/MoreInfo/MoreInfo';

// Images
import Image from 'next/image';
import DownIcon from '@/icons/down.svg';
import ArrowLeft from '@/icons/arrow-left.svg';
import Head from "next/head";

import { initAdmin } from "lib/firebaseAdmin";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const MoreInfos = (props: MoreInfoData & { seo: any }) => {
  const router = useRouter();
  const { ArticleName: queryArticleName } = router.query;
  const [category, setCategory] = useState<categoryData[]>();

  const [currentSelection, setCurrentSelection] = useState<string>(props.ArticleName);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const date = new Date(props.post.frontMatter.date);
  const { seo } = props;

  // 得到作者資訊
  const [postData, setpostData] = useState<GetArticleLinkByFileName>();

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await axios.get(`/api/getArticleLinkByFilename?filename=${currentSelection}`);
        setpostData(res.data);
      } //處理404
      catch (error: any) {
        switch (error.response.status) {
          case 404:
            console.log('404 ERROR：找不到文章');
            break;
          default:
            break;
        }
      }
    };

    fetchAuthorData();
  }, [currentSelection]);

  // 類別 要放到 Sidebar 裡面
  useEffect(() => {
    const fetchCategoryData = async () => {
      const res = await axios.get(`/api/getMoreInfo`);
      setCategory(res.data);
    }

    fetchCategoryData();
  }, []);

  if (!props.post) {
    return (
      <>
        <Head>
          <title>找不到頁面 - {seo.MoreInfo.title}</title>
          <meta name="description" content={seo.MoreInfo.description} />
          <meta property="og:title" content={`找不到頁面 - ${seo.MoreInfo.title}`} />
          <meta property="og:description" content={seo.MoreInfo.description} />
          <meta property="og:image" content={seo.MoreInfo.image} />
          {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
          <meta property="og:type" content={seo.MoreInfo.type} />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          <meta name="twitter:title" content={`找不到頁面 - ${seo.MoreInfo.title}`} />
          <meta name="twitter:description" content={seo.MoreInfo.description} />
          <meta name="twitter:image" content={seo.MoreInfo.image} />
        </Head>
        <div className="min-h-screen flex flex-col">
          <div className="sm:mx-auto sm:px-16">
            <Navbar />
          </div>
          <div className="sm:flex">

            {/* Sidebar */}
            <div>
              {
                category &&
                <>
                  {/* 電腦版 Sidebar */}
                  <div className="border-r-[1px] border-[#E7E6F2] dark:border-neutral-800 hidden sm:block">
                    <Sidebar
                      data={category}
                      path={props.ArticleName}
                      onChange={(value: string) => setCurrentSelection(value)}
                      className="w-80"
                    />
                  </div>

                  {/* 手機版目錄 */}
                  <div className="relative mx-5 sm:hidden">
                    <IconWithTextBtn
                      onClick={() => setIsDrawerOpen(true)}
                      icon={DownIcon}
                      className="flex"
                    >
                      <div className="flex grow">
                        目錄
                        <div className="text-neutral-500 mx-2">
                          ｜
                        </div>
                        尚未選取文章
                        {/* 箭頭 */}
                      </div>
                      <div className="self-center">
                        <Image
                          src={DownIcon}
                          alt="Icon Dark"
                          className={`transition-transform duration-200 dark:invert`}
                        ></Image>
                      </div>
                    </IconWithTextBtn>
                  </div>
                </>
              }
            </div>

            {/* 404 */}
            <NotFound></NotFound>
          </div>

          {/* 手機版目錄 */}
          {
            category && <MoreInfoDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              data={category}
              path={props.ArticleName}
              onChange={(value: string) => setCurrentSelection(value)}
            ></MoreInfoDrawer>
          }

        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{props.post.frontMatter.title} - {seo.MoreInfo.title}</title>
        <meta name="description" content={props.post.frontMatter.description} />
        <meta property="og:title" content={`${props.post.frontMatter.title} - ${seo.MoreInfo.title}`} />
        <meta property="og:description" content={props.post.frontMatter.description} />
        <meta property="og:image" content={seo.MoreInfo.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={seo.MoreInfo.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={`${props.post.frontMatter.title} - ${seo.MoreInfo.title}`} />
        <meta name="twitter:description" content={props.post.frontMatter.description} />
        <meta name="twitter:image" content={seo.MoreInfo.image} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="sm:mx-auto sm:px-16">
          <Navbar />
        </div>
        <div className="sm:flex">

          {/* Sidebar */}
          <div className="border-r-[1px] border-[#E7E6F2] dark:border-neutral-800 hidden sm:block">
            {
              category &&
              <Sidebar
                data={category}
                path={props.ArticleName}
                onChange={(value: string) => setCurrentSelection(value)}
                className="w-80"
              />
            }
          </div>

          {/* 手機版目錄 */}
          <div className="relative mx-5 sm:hidden">
            <IconWithTextBtn
              onClick={() => setIsDrawerOpen(true)}
              icon={DownIcon}
              className="flex"
            >
              <div className="flex grow">
                目錄
                <div className="text-neutral-500 mx-2">
                  ｜
                </div>
                {props.post.frontMatter.title}
                {/* 箭頭 */}
              </div>
              <div className="self-center">
                <Image
                  src={DownIcon}
                  alt="Icon Dark"
                  className={`transition-transform duration-200 dark:invert`}
                ></Image>
              </div>
            </IconWithTextBtn>
          </div>

          {/* 手機版回傳箭頭 */}
          <div className="sm:hidden px-4 mt-8">
            <button onClick={() => setIsDrawerOpen(true)}>
              <Image
                src={ArrowLeft}
                alt="Icon Dark"
                className={`transition-transform duration-200 dark:invert`}
              ></Image>
            </button>
          </div>

          {/* 內文 */}
          <div className="flex-grow mx-auto sm:px-28 mb-10">
            <ArticleLayout className='pt-3 sm:pt-10 px-5 sm:px-0'>

              {/* 標題 */}
              <h1 className="mb-2 text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{props.post.frontMatter.title}</h1>

              {/* 描述 */}
              <p className="mb-3 text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{props.post.frontMatter.description}</p>

              {/* 內文 */}
              <MD>
                {props.post.source}
              </MD>

              {/* 分隔線 */}
              <HorizontalLine className="hidden sm:block my-5" />

              {/* 標籤 */}
              <div className='flex mt-2 mb-5 gap-2 relative overflow-hidden'>
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={8} // 調整間距
                  freeMode={true}
                  modules={[FreeMode]}
                  className="h-8"
                >
                  {
                    props.post.frontMatter.tags.map((item, index) => (
                      <SwiperSlide key={index} className="!w-auto max-w-full">
                        <Tag
                          key={index}
                          text={item}
                          type={['Post']}
                          className="text-xs py-1 px-3"
                        />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>

              {
                // <div className="flex gap-2 items-center">
                // {/* 作者頭貼 */}
                // <div
                //   onClick={() => { router.push(`/Author/${postData?.authorData.id}`) }}
                //   className="flex gap-2 items-center"
                // >
                //   {
                //     postData?.authorData.img &&
                //     <div>
                //       <Image
                //         src={postData?.authorData.img}
                //         alt="Icon Dark"
                //         width={1000}
                //         height={1000}
                //         className="rounded-full w-10 h-10"
                //       />
                //     </div>
                //   }

                //   {/* 作者 */}
                //   <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                //     {postData?.authorData.name}
                //   </div>
                // </div>

                // <div className="text-neutral-300">
                //   ﹒
                // </div>

                // {/* 日期 */}
                // <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                //   {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                //   &nbsp;
                //   {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                //   &nbsp;
                //   {date.getHours() > 12 ? 'PM' : 'AM'}
                // </div>
                // </div>
              }

            </ArticleLayout>
          </div>
        </div>

        {/* 手機版目錄 */}
        {
          category && <MoreInfoDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            data={category}
            path={props.ArticleName}
            onChange={(value: string) => setCurrentSelection(value)}
          ></MoreInfoDrawer>
        }

      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req } = context;
  const ArticleName = params?.ArticleName as string;

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['host'];
    const apiUrl = `${protocol}://${host}`;

    const linkApiUrl = `${apiUrl}/api/getArticleLinkByFilename?filename=${ArticleName}`;

    // 取得文章連結
    const linkRes = await axios.get(linkApiUrl);
    const linkData = linkRes.data;
    const { link, authorData } = linkData;
    const [userID, postID] = link.split('/');

    // 取得文章內容
    const markdownApiUrl = `${apiUrl}/api/getArticleMarkdown?userID=${userID}&postID=${postID}`;
    const markdownRes = await axios.get(markdownApiUrl);
    const { content, data } = markdownRes.data;
    const mdxSource = await serialize(content);

    // 取得SEO資料
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    return {
      props: {
        post: {
          source: mdxSource,
          frontMatter: {
            ...data,
            authorData: authorData,
          },
        },
        seo: seoData,
        ArticleName,
      },
    };
  } catch (error) {
    console.error('Error fetching article content or SEO data:', error);
    return { notFound: true };
  }
};


export default MoreInfos;
