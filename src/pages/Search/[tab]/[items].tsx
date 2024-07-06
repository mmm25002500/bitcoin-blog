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

const SearchPage = () => {
  const router = useRouter();
  const [searchList2, setSearchList2] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [tabData, setTabData] = useState<TabDataType>();
  const [searchType, setSearchType] = useState<string>('');

  const items = router.query.items as string;
  const tab = router.query.tab as string;

  // 初始化資料
  useEffect(() => {
    if (tab) {
      setSelectedTab(tab);
    }
    if (items) {
      setSearchText(items);
    }
  }, [tab, items]);

  // 處理 Tab 改變
  useEffect(() => {
    // 從 TabData 找出 selectedTab 的資料
    const data = TabData.find((tab) => tab.name === selectedTab);
    if (data)
      setTabData(data);

    switch (selectedTab) {
      case 'Posters':
        setSearchType('label');
        break;
      case 'News':
        setSearchType('label');
        break;
      case 'Creators':
        setSearchType('text');
        break;
      default:
        setSearchType('label');
    }
  }, [selectedTab]);

  useEffect(() => {
    // 如果 items 是 list 並且非 undefined
    if (items != undefined && typeof items == 'string') {
      setSearchList2(items.split(','));
    }
  }, [items]);

  // 處理搜尋欄位改變
  const handleSearchChange = (tabName: string, searchText: string[]) => {
    redirect(tabName, searchText);
  };

  // 處理 Poster 及 News 搜尋
  const handleSearch = () => {
    redirect(selectedTab, searchList2);
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
    if (searchType === 'text') {
      redirect(tabName, searchText);
    }
    else {
      redirect(tabName, searchList2);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sm:mx-auto sm:px-16 mx-8">
        {/* Search Bar */}

        {
          // 如果是標籤類型
          searchType === 'label' ?
            <InputLabel
              placeholder={'請輸入標籤'}
              icon={searchBtn}
              frontIcon={false}
              text={searchList2}
              onClick={handleSearch}
              onChange={(text) => handleSearchChange(selectedTab, text)}
            />
            :
            // 如果是文字類型
            <InputText
              placeholder={'請輸入內容'}
              icon={searchBtn}
              text={searchText}
              onClick={handleSearch}
              onChange={(text: string) => setSearchText(text)}
            />
        }

        {/* Tab */}
        <Tab
          data={TabData}
          className="mt-8"
          selectedTab={selectedTab}
          onChange={(tabName: string) => handleTabChange(tabName)}
        />

        <HorizontalLine />

      </div>
    </>
  );
}

export default SearchPage;
