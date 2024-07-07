import InputLabel from "@/components/Input/InputLable";
import Navbar from "@/components/Layout/Navbar";
import Tab from "@/components/Tab/Tab";
import searchBtn from '@/icons/SearchBtn.svg';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TabData from "@/config/SearchTab.json";
import HorizontalLine from "@/components/HorizontalLine";
import { TabDataType } from "@/types/Tab/Tab";
import InputText from "@/components/Input/InputText";
import PostListAll from "@/components/List/PostListAll";
import { PostProps } from '@/types/List/PostData';
import axios from "axios";
import { LawAuthorData } from "@/types/List/Author";
import Author from "@/components/List/Author";
import AuthorList from "@/components/List/AuthorList";

const SearchPage = ({ initialPosts, initialSelection }: { initialPosts: PostProps[], initialSelection: string }) => {
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
  // Type = Post or News
  // Author = all
  // Tag = searchList2
  // mode = all
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      // 確保 currentType, currentAuthor 和 mode 不為空
      if (selectedTab && currentAuthor && mode !== undefined) {
        try {
          const response = await axios.get('/api/getPostsByFilter', {
            params: {
              type: {
                Posters: 'Post',
                News: 'News'
              }[selectedTab], author: currentAuthor, tag: searchText, mode: mode
            }
          }
          );
          setFilteredPosts(response.data);
        } catch (error) {
          console.error("Error fetching filtered posts:", error);
        }
      }
    };

    if (selectedTab === 'Posters' || selectedTab === 'News') {
      fetchFilteredPosts();
    }
  }, [selectedTab, currentAuthor, mode, searchText]);


  // 傳到後端拿資料，用 searchText 篩選作者
  // text = searchText
  useEffect(() => {
    const fetchFilteredAuthors = async () => {
      if (selectedTab && searchText) {
        try {
          const response = await axios.get('/api/getAuthorsByDescription', {
            params: { text: searchText }
          });
          const authors = response.data;

          // 取得作者的文章數量
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

    if (selectedTab === 'Creators') {
      fetchFilteredAuthors();
    }
  }, [selectedTab, searchText]);

  // 處理搜尋欄位改變
  const handleSearchChange = (searchText: string[]) => {
    // redirect(tabName, searchText);
    setSearchText(searchText.join(','));
  };

  // 處理 Poster 及 News 搜尋
  const handleSearch = () => {
    searchText && redirect(selectedTab, searchText);
  }

  // 重新導向 帶有陣列字串的搜尋
  const redirect = (tabName: string, searchText: string | string[]) => {
    switch (typeof searchText) {
      case 'string':
        {
          const newPath = `/Search/${tabName}/${searchText}`;
          if (router.asPath !== newPath) {
            router.push(newPath);
          }
        }
        break;
      case 'object':
        {
          const newPath = `/Search/${tabName}/${searchText.join(',')}`;
          if (router.asPath !== newPath) {
            router.push(newPath);
          }
        }
        break;
    }
  }

  // 處理 Tab 改變
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
    if (selectedTab === 'Creators') {
      redirect(tabName, searchText);
    }
    else {
      redirect(tabName, searchText);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sm:mx-auto sm:px-16 mx-8">
        {/* Search Bar */}
        {
          // 如果是文字類型
          selectedTab === 'Creators' ?
            <InputText
              placeholder={'請輸入內容'}
              icon={searchBtn}
              text={searchText}
              onClick={handleSearch}
              onChange={(e) => setSearchText(e.target.value)}
            />
            :
            // 如果是標籤類型
            <InputLabel
              placeholder={'請輸入標籤'}
              icon={searchBtn}
              frontIcon={false}
              text={searchText ? searchText.split(',') : []}
              onClick={handleSearch}
              onChange={handleSearchChange}
            />
        }
      </div>


      <div className="sm:mx-auto sm:px-16">

        {/* Tab */}
        <Tab
          data={TabData}
          className="mt-8"
          selectedTab={selectedTab}
          onChange={(tabName: string) => handleTabChange(tabName)}
        />

        <HorizontalLine />

        {/* Label區域 */}
        {
          selectedTab === 'Posters' || selectedTab === 'News' ?
            <>
              {
                filteredPosts && <PostListAll data={filteredPosts}></PostListAll>
              }
            </>
            :
            // 如果是創作者類型
            <>
              {
                filteredAuthors && <AuthorList
                  data={filteredAuthors}
                />
              }
            </>
        }
      </div>
    </>
  );
}

export default SearchPage;
