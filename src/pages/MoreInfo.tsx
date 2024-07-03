import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';

// components
import Navbar from "@/components/Layout/Navbar";
import Sidebar from '@/components/Sidebar/MoreInfoSidebar';
import NotFound from "@/components/NotFound/NotFound";
import MoreInfoDrawer from "@/components/Drawer/MoreInfoDrawer";
import IconWithTextBtn from "@/components/Button/IconWithTextBtn";

// types
import { categoryData } from "@/types/MoreInfo/MoreInfo";
import { MoreInfoData } from '@/types/MoreInfo/MoreInfo';


// Images
import Image from 'next/image';
import DownIcon from '@/icons/down.svg';

const MoreInfos = (props: MoreInfoData) => {
  const router = useRouter();
  const { ArticalName: queryArticalName } = router.query;
  const [category, setCategory] = useState<categoryData[]>();

  const [currentSelection, setCurrentSelection] = useState<string>(props.ArticalName);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 類別 要放到 Sidebar 裡面
  useEffect(() => {
    const fetchCategoryData = async () => {
      const res = await axios.get(`/api/getMoreInfo`);
      setCategory(res.data);
    }

    fetchCategoryData();
  }, []);

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
        <div className="relative mx-4 sm:hidden">
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

export default MoreInfos;
