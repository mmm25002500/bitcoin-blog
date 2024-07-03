import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { readdirSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { readFileSync } from 'fs';

// components
import Navbar from "@/components/Layout/Navbar";
import ArticalLayout from "@/components/Layout/Artical/AriticalLayout";
import Sidebar from '@/components/Sidebar/MoreInfoSidebar';
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import NotFound from "@/components/NotFound/NotFound";
import HorizontalLine from "@/components/HorizontalLine";
import MoreInfoDrawer from "@/components/Drawer/MoreInfoDrawer";
import IconWithTextBtn from "@/components/Button/IconWithTextBtn";

// types
import { GetArticalLinkByFileName } from "@/types/API/getArticalLinkByFileName";
import { categoryData } from "@/types/MoreInfo/MoreInfo";
import { MoreInfoData } from '@/types/MoreInfo/MoreInfo';

// Images
import Image from 'next/image';
import DownIcon from '@/icons/down.svg';
import ArrowLeft from '@/icons/arrow-left.svg';

const MoreInfos = (props: MoreInfoData) => {
  const router = useRouter();
  const { ArticalName: queryArticalName } = router.query;
  const [category, setCategory] = useState<categoryData[]>();

  const [currentSelection, setCurrentSelection] = useState<string>(props.ArticalName);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 得到作者資訊
  const [postData, setpostData] = useState<GetArticalLinkByFileName>();

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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex">

          {/* Sidebar */}
          <div>
            {
              category &&
              <Sidebar
                data={category}
                path={props.ArticalName}
                onChange={(value: string) => setCurrentSelection(value)}
                className="w-80"
              />
            }
          </div>

          {/* 404 */}
          <NotFound></NotFound>
        </div>
      </div>
    )
  }

  const date = new Date(props.post.frontMatter.date);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="sm:flex">

        {/* Sidebar */}
        <div className="border-r-[1px] border-[#E7E6F2] dark:border-neutral-800 hidden sm:block">
          {
            category &&
            <Sidebar
              data={category}
              path={props.ArticalName}
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

        {/* 手機版返回箭頭 */}
        <div className="px-4 mt-8">
          <button onClick={() => router.push('/MoreInfo')}>
            <Image
              src={ArrowLeft}
              alt="Icon Dark"
              className={`transition-transform duration-200 dark:invert`}
            ></Image>
          </button>
        </div>

        {/* 內文 */}
        <div className="flex-grow mx-auto sm:px-28 mb-10">
          <ArticalLayout className='pt-3 sm:pt-10 px-5 sm:px-0'>

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
            <div className="mt-2 mb-5 flex gap-2">
              {props.post.frontMatter.tags.map((item, index) => (
                <Tag key={index} text={item} type={["Post"]} className="text-xs py-1 px-3" />
              ))}
            </div>

            <div className="flex gap-2 items-center">
              {/* 作者頭貼 */}
              {
                postData?.authorData.img &&
                <div>
                  <Image
                    src={postData?.authorData.img}
                    alt="Icon Dark"
                    width={1000}
                    height={1000}
                    className="rounded-full w-10 h-10"
                  />
                </div>
              }

              {/* 作者 */}
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {postData?.authorData.name}
              </div>

              <div className="text-neutral-300">
                ﹒
              </div>

              {/* 日期 */}
              <div className="text-sm font-medium leading-5 dark:text-neutral-white">
                {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
                &nbsp;
                {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
                &nbsp;
                {date.getHours() > 12 ? 'PM' : 'AM'}
              </div>
            </div>

          </ArticalLayout>
        </div>
      </div>

      {/* 手機版目錄 */}
      {
        category && <MoreInfoDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={category}
          path={props.ArticalName}
          onChange={(value: string) => setCurrentSelection(value)}
        ></MoreInfoDrawer>
      }

    </div>
  );
};

// 設置靜態路徑
export const getStaticPaths: GetStaticPaths = async () => {
  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);

  const paths = authorDirs.flatMap((userID) => {
    const articlesDirectory = join(basePath, userID);
    return readdirSync(articlesDirectory)
      .filter((file) => file.endsWith('.mdx'))
      .map((fileName) => ({
        params: { ArticalName: fileName.replace(/\.mdx$/, '') },
      }));
  });

  return { paths, fallback: 'blocking' };
}

// 獲取靜態頁面所需的數據
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const ArticalName = params?.ArticalName as string;

  // 獲取文章內容
  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);
  let filePath = '';

  for (const userID of authorDirs) {
    const userDir = join(basePath, userID);
    const userFiles = readdirSync(userDir);

    if (userFiles.includes(`${ArticalName}.mdx`)) {
      filePath = join(userDir, `${ArticalName}.mdx`);
      break;
    }
  }

  if (!filePath) {
    return {
      props: {
        post: null,
        ArticalName,
      }
    };
  }

  const fileContents = readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      post: {
        source: mdxSource,
        frontMatter: {
          ...data,
        },
      },
      ArticalName,
    },
  };
};

export default MoreInfos;
