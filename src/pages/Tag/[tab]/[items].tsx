import InputLabel from "@/components/Input/InputLable";
import Navbar from "@/components/Layout/Navbar";
import Tab from "@/components/Tab/Tab";
import searchBtn from '@/icons/SearchBtn.svg';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HorizontalLine from "@/components/HorizontalLine";
import InputText from "@/components/Input/InputText";
import PostListAll from "@/components/List/PostListAll";
import { PostProps } from '@/types/List/PostData';
import axios from "axios";
import { LawAuthorData } from "@/types/List/Author";
import AuthorList from "@/components/List/AuthorList";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { initAdmin } from "lib/firebaseAdmin";
import { TabDataType } from "@/types/Tab/Tab";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import right from '@/icons/right.svg';
import left from '@/icons/left.svg';
import Radio from "@/components/Radio/Radio";

const TagPage = ({ initialPosts, initialSelection, seoData, tags, tabData, SiteConfig }: { initialPosts: PostProps[], initialSelection: string, tags: string[], seoData: any, tabData: TabDataType[], SiteConfig: any }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(router.query.items as string);
  const [selectedTab, setSelectedTab] = useState<string>(initialSelection);

  const [currentAuthor, setCurrentAuthor] = useState<string>('all');
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);
  const [mode, setMode] = useState<string>('all');
  const [filteredAuthors, setFilteredAuthors] = useState<LawAuthorData[]>();

  const items = router.query.items as string;
  const tab = router.query.tab as string;

  // 初始化資料
  useEffect(() => {
    if (items) {
      setSearchText(items);
    }
  }, [items]);

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab);
    }
  }, [tab]);

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      if (selectedTab && currentAuthor && mode !== undefined) {
        try {
          const response = await axios.get('/api/getPostsByFilter', {
            params: {
              type: {
                Post: 'Post',
                News: 'News'
              }[selectedTab], author: currentAuthor, tag: searchText, mode: mode
            }
          });
          setFilteredPosts(response.data);
        } catch (error) {
          console.error("Error fetching filtered posts:", error);
        }
      }
    };

    if (selectedTab === 'Post' || selectedTab === 'News') {
      fetchFilteredPosts();
    }
  }, [selectedTab, currentAuthor, mode, searchText]);

  // 傳到後端拿資料，用 searchText 篩選作者
  useEffect(() => {
    const fetchFilteredAuthors = async () => {
      if (selectedTab && searchText) {
        try {
          const response = await axios.get('/api/getAuthorsByDescription', {
            params: { text: searchText }
          });
          const authors = response.data;

          const authorsWithPostCount = await Promise.all(authors.map(async (author: LawAuthorData) => {
            const postCountResponse = await axios.get('/api/getAuthorPostCount', {
              params: { author: author.id }
            });
            const postCount = postCountResponse.data.postCount;
            return { ...author, posts: postCount };
          }));

          setFilteredAuthors(authorsWithPostCount);
        } catch (error) {
          console.error("Error fetching filtered authors:", error);
        }
      }
    };
  }, [selectedTab, searchText]);

  // 處理搜尋欄位改變
  const handleSearchChange = (searchText: string[]) => {
    setSearchText(searchText.join(','));
  };

  // 處理 Poster 及 News 搜尋
  const handleSearch = () => {
    searchText && redirect(selectedTab, searchText);
  }

  // 重新導向 帶有陣列字串的搜尋
  const redirect = (tabName: string, searchText: string | string[]) => {
    switch (typeof searchText) {
      case 'string': {
        const newPath = `/Tag/${tabName}/${searchText}`;
        if (router.asPath !== newPath) {
          router.push(newPath);
        }
        break;
      }
      case 'object': {
        const newPath = `/Tag/${tabName}/${searchText.join(',')}`;
        if (router.asPath !== newPath) {
          router.push(newPath);
        }
        break;
      }
    }
  }

  // 處理 Tab 改變
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
    redirect(tabName, searchText);
  };

  return (
    <>
      <Head>
        <title>{seoData.Search.title}</title>
        <meta name="description" content={seoData.Search.description} />
        <meta property="og:title" content={seoData.Search.title} />
        <meta property="og:description" content={seoData.Search.description} />
        <meta property="og:image" content={seoData.Search.image} />
        <meta property="og:type" content={seoData.Search.type} />
        <meta name="twitter:title" content={seoData.Search.title} />
        <meta name="twitter:description" content={seoData.Search.description} />
        <meta name="twitter:image" content={seoData.Search.image} />
      </Head>
      <Navbar />

      {/* 標籤 */}
      <div className="mx-auto px-6 sm:px-28">
        <div className="my-5">
          <div className="relative w-full h-7 mt-4">

            <div className="relative w-auto h-7 mx-5">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                loop={true}
                slidesPerGroup={2}
                freeMode={true}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                modules={[FreeMode, Navigation]}
                className="w-full h-7"
              >
                <SwiperSlide key={"all"} className="!w-auto">
                  <Radio.Btn
                    text="All"
                    value="all"
                    id="All"
                    selectedValue={searchText}
                    onChange={(value: string) => setSearchText(value)}
                    className={`text-xs py-1 px-3 ${searchText === "all" ? 'bg-black text-white' : ''}`}
                  />
                </SwiperSlide>

                {tags.map((tag, idx) => (
                  <SwiperSlide key={idx} className="!w-auto">
                    <Radio.Btn
                      text={tag}
                      value={tag}
                      id={tag}
                      selectedValue={searchText}
                      onChange={(value: string) => setSearchText(value)}
                      className={`text-xs py-1 px-3 ${searchText === tag ? 'bg-black text-white' : ''}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 左右箭頭 */}
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-0">
              <Image
                src={left}
                alt="Icon Dark"
                width={1000}
                height={1000}
                className="rounded-full w-5 h-5 dark:invert"
              />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-0">
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

      {/* 文章 */}
      <div className="mx-auto sm:px-28">

        {/* Tab */}
        <Tab
          data={[
            {
              name: '文章',
              link: 'Post'
            },
            {
              name: '新聞',
              link: 'News'
            }
          ]}
          className="mt-8"
          selectedTab={selectedTab}
          onChange={(tabName: string) => handleTabChange(tabName)}
        />

        <HorizontalLine />

        {/* Label區域 */}
        {
          filteredPosts &&
          <PostListAll
            data={filteredPosts}
            postsPerPage={SiteConfig.PostListAllPerpage}
          />
        }
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const moreInfoFile = bucket.file('config/MoreInfo.json');
    const moreInfoFileContents = (await moreInfoFile.download())[0].toString('utf8');
    const moreInfoData = JSON.parse(moreInfoFileContents);

    const paths = moreInfoData.map((item: { link: string }) => ({
      params: { ArticleName: item.link.split('/').pop() }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params;
  const tab = params?.tab as string;

  try {
    // 取得SEO設定
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    // 取得Tab設定
    const tabFile = bucket.file('config/SearchTab.json');
    const tabFileContents = (await tabFile.download())[0].toString('utf8');
    const tabData = JSON.parse(tabFileContents);


    // 取得Tag設定
    const tagsFile = bucket.file('config/Tags.json');
    const tagsFileContents = (await tagsFile.download())[0].toString('utf8');
    const tagsData = JSON.parse(tagsFileContents);

    // 取得SiteConfig設定
    const siteConfigFile = bucket.file('config/SiteConfig.json');
    const siteConfigFileContents = (await siteConfigFile.download())[0].toString('utf8');
    const siteConfigData = JSON.parse(siteConfigFileContents);

    return {
      props: {
        seoData,
        tabData,
        SiteConfig: siteConfigData,
        tags: tagsData.all,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};

export default TagPage;
