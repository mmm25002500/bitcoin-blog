import Navbar from "@/components/Layout/Navbar";
import Tab from "@/components/Tab/Tab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HorizontalLine from "@/components/HorizontalLine";
import PostListAll from "@/components/List/PostListAll";
import type { PostProps } from "@/types/List/PostData";
import axios from "axios";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import SEO from "@/config/SEO.json";
import SiteConfig from "@/config/SiteConfig.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import { getBaseUrl } from "@/lib/utils";
import right from "@/icons/right.svg";
import left from "@/icons/left.svg";
import Radio from "@/components/Radio/Radio";

const TagPage = ({
  initialPosts,
  initialSelection,
  tags,
}: {
  initialPosts: PostProps[];
  initialSelection: string;
  tags: string[];
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(
    router.query.items as string,
  );
  const [selectedTab, setSelectedTab] = useState<string>(initialSelection);

  const [currentAuthor] = useState<string>("all");
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);
  const [mode] = useState<string>("all");

  const items = router.query.items as string;
  const tab = router.query.tab as string;

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
          const response = await axios.get("/api/getPostsByFilter", {
            params: {
              type: {
                Post: "Post",
                News: "News",
              }[selectedTab],
              author: currentAuthor,
              tag: searchText,
              mode: mode,
            },
          });
          setFilteredPosts(response.data);
        } catch (error) {
          console.error("Error fetching filtered posts:", error);
        }
      }
    };

    if (selectedTab === "Post" || selectedTab === "News") {
      fetchFilteredPosts();
    }
  }, [selectedTab, currentAuthor, mode, searchText]);

  // 重新導向 帶有陣列字串的搜尋
  const redirect = (tabName: string, searchText: string | string[]) => {
    switch (typeof searchText) {
      case "string": {
        const newPath = `/Tag/${tabName}/${searchText}`;
        if (router.asPath !== newPath) {
          router.push(newPath);
        }
        break;
      }
      case "object": {
        const newPath = `/Tag/${tabName}/${searchText.join(",")}`;
        if (router.asPath !== newPath) {
          router.push(newPath);
        }
        break;
      }
    }
  };

  // 處理 Tab 改變
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
    redirect(tabName, searchText);
  };

  return (
    <>
      <Head>
        <title>{SEO.Tag.title}</title>
        <meta name="description" content={SEO.Tag.description} />
        <meta property="og:title" content={SEO.Tag.title} />
        <meta property="og:description" content={SEO.Tag.description} />
        <meta property="og:image" content={SEO.Tag.image} />
        <meta property="og:type" content={SEO.Tag.type} />
        <meta name="twitter:title" content={SEO.Tag.title} />
        <meta name="twitter:description" content={SEO.Tag.description} />
        <meta name="twitter:image" content={SEO.Tag.image} />
      </Head>

      <div
        className={`top-0 w-full z-50 ${scrolled ? "fixed bg-navbar-scrolled" : "bg-navbar-default"}`}
      >
        <Navbar scrolled={scrolled} />
      </div>
      <div className={`${scrolled ? "h-16" : ""}`} />

      <div className="mx-auto md:px-28 w-full lg:w-[1280px]">
        <div className="px-5 md:px-0 mb-4 my-5">
          {/* 標籤 */}
          <div className="relative w-full h-10">
            <div className="relative">
              <div className="px-8 md:px-0">
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={20}
                  loop={true}
                  slidesPerGroup={2}
                  freeMode={true}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  modules={[FreeMode, Navigation]}
                  className="w-full h-8"
                >
                  <SwiperSlide key={"all"} className="!w-auto">
                    <Radio.Btn
                      text="All"
                      value="all"
                      id="All"
                      selectedValue={searchText}
                      onChange={(value: string) => setSearchText(value)}
                      className={`text-xs py-1 px-3 ${searchText === "all" ? "bg-black text-white" : ""}`}
                    />
                  </SwiperSlide>

                  {tags.map((tag) => (
                    <SwiperSlide key={tag} className="!w-auto">
                      <Radio.Btn
                        text={tag}
                        value={tag}
                        id={tag}
                        selectedValue={searchText}
                        onChange={(value: string) => setSearchText(value)}
                        className={`text-xs py-1 px-3 ${searchText === tag ? "bg-black text-white" : ""}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 左右箭頭 */}
              <div className="swiper-button-prev absolute left-0 md:-left-8 top-1/2 transform -translate-y-3 z-0">
                <Image
                  src={left}
                  alt="Icon Dark"
                  width={1000}
                  height={1000}
                  className="rounded-full w-5 h-5 dark:invert"
                />
              </div>
              <div className="swiper-button-next absolute right-0 md:-right-8 top-1/2 transform -translate-y-3 z-0">
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

          {/* 文章 */}
          <div className="">
            {/* Tab */}
            <Tab
              data={[
                {
                  name: "文章",
                  link: "Post",
                },
                {
                  name: "新聞",
                  link: "News",
                },
              ]}
              className="mt-8"
              selectedTab={selectedTab}
              onChange={(tabName: string) => handleTabChange(tabName)}
            />

            <HorizontalLine />

            {/* Label區域 */}
            {filteredPosts && (
              <PostListAll
                data={filteredPosts}
                postsPerPage={SiteConfig.PostListAllPerpage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // 從 API 取得 Tags
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/tags/getAllTags`);
    const result = await response.json();

    return {
      props: {
        tags: result.success ? result.tags : [],
        initialPosts: [],
        initialSelection: (context.params?.tab as string) || "Post",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        tags: [],
        initialPosts: [],
        initialSelection: "Post",
      },
    };
  }
};

export default TagPage;
