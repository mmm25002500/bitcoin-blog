import { useEffect, useState } from "react";
import axios from 'axios';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import Tags from "@/config/Tags.json";
import NewsListAll from "@/components/List/NewsListAll";
import { NewsPostProps } from "@/types/HomePage/NewsSection";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation } from 'swiper/modules';

import right from '@/icons/right.svg';
import left from '@/icons/left.svg';
import Image from 'next/image';

const NewsSection = (props: NewsPostProps) => {
  const [currentSelection, setCurrentSelection] = useState<string>(props.initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(props.initialPosts);
  const [currentType, setCurrentType] = useState<string>('News');
  const [currentAuthor, setCurrentAuthor] = useState<string>('all');

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await axios.get('/api/getPostsByFilter', {
        params: { type: 'News', author: currentAuthor, tag: currentSelection }
      });
      setFilteredPosts(response.data);
    };

    fetchFilteredPosts();
  }, [currentSelection, currentType, currentAuthor]);

  return (
    <>
      <p className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-[42px] text-center py-8">NEWS</p>
      <div className="relative w-full h-7">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20} // 调整间距
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
              selectedValue={currentSelection}
              onChange={(value: string) => setCurrentSelection(value)}
              className={`text-xs py-1 px-3 ${currentSelection === "all" ? 'bg-black text-white' : ''}`}
            />
          </SwiperSlide>

          {Tags.News.map((tag, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <Radio.Btn
                text={tag}
                value={tag}
                id={tag}
                selectedValue={currentSelection}
                onChange={(value: string) => setCurrentSelection(value)}
                className={`text-xs py-1 px-3 ${currentSelection === tag ? 'bg-black text-white' : ''}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>


        {/* 左右箭頭 */}
        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <Image
            src={left}
            alt="Icon Dark"
            width={1000}
            height={1000}
            className="rounded-full w-5 h-5 dark:invert"
          />
        </div>
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <Image
            src={right}
            alt="Icon Dark"
            width={1000}
            height={1000}
            className="rounded-full w-5 h-5 dark:invert"
          />
        </div>
      </div>

      <NewsListAll data={filteredPosts} />
    </>
  );
}

export default NewsSection;
