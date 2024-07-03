import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { readFileSync } from 'fs';
import Navbar from "@/components/Layout/Navbar";
import ArticalLayout from "@/components/Layout/Artical/AriticalLayout";
import MD from "@/components/MD";
import Sidebar from '@/components/Sidebar/MoreInfoSidebar';
import { MoreInfoData } from '@/types/MoreInfo/MoreInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tag from "@/components/Tag/Tag";
import { GetArticalLinkByFileName } from "@/types/API/getArticalLinkByFileName";
import { categoryData } from "@/types/MoreInfo/MoreInfo";

const MoreInfos = (props: MoreInfoData) => {
  const router = useRouter();
  const { ArticalName: queryArticalName } = router.query;
  const [category, setCategory] = useState<categoryData[]>();

  const [currentSelection, setCurrentSelection] = useState<string>(props.ArticalName);

  // 得到作者資訊
  const [postData, setpostData] = useState<GetArticalLinkByFileName>();

  useEffect(() => {
    const fetchAuthorData = async () => {
      const res = await axios.get(`/api/getArticleLinkByFilename?filename=${currentSelection}`);
      setpostData(res.data);
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
    return <NotFoundPage />;
  }

  const date = new Date(props.post.frontMatter.date);

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

        {/* 內文 */}
        <div className="flex-grow mx-auto sm:px-28">
          <ArticalLayout className='pt-10 px-5 sm:px-0'>

            {/* 標題 */}
            <h1 className="mb-2 text-xl leading-[30px] sm:text-[32px] sm:leading-[48px] font-bold">{props.post.frontMatter.title}</h1>

            {/* 描述 */}
            <p className="mb-3 text-sm leading-[22px] sm:text-xl sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">{props.post.frontMatter.description}</p>

            {/* 內文 */}
            <MD>
              {props.post.source}
            </MD>

            {/* 標籤 */}
            <div className="mt-2 mb-5 flex gap-2">
              {props.post.frontMatter.tags.map((item, index) => (
                <Tag key={index} text={item} type={["Post"]} className="text-xs py-1 px-3" />
              ))}
            </div>

            {/* 時間 */}
            <div className="text-sm font-medium leading-5 dark:text-neutral-white">
              {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
              &nbsp;
              {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}
              &nbsp;
              {date.getHours() > 12 ? 'PM' : 'AM'}
            </div>

            {/* 作者 */}
            <div>
              {postData?.authorData.fullname}
            </div>
          </ArticalLayout>
        </div>
      </div>
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
    return { notFound: true };
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
