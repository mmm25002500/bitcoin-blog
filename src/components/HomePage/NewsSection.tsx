import { useEffect, useState } from "react";
import axios from 'axios';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import Tags from "@/config/Tags.json";
import NewsListAll from "@/components/List/NewsListAll";
import { NewsPostProps } from "@/types/HomePage/NewsSection";
import Tag from "../Tag/TagTab";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode } from 'swiper/modules';

const NewsSection = (props: NewsPostProps) => {
  const [currentSelection, setCurrentSelection] = useState<string>(props.initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(props.initialPosts);
  const [currentType, setCurrentType] = useState<string>('News');
  const [currentAuthor, setCurrentAuthor] = useState<string>('all');

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await axios.get('/api/getPostsByFilter', {
        params: { type: currentType, author: currentAuthor, tag: currentSelection }
      });
      setFilteredPosts(response.data);
    };

    fetchFilteredPosts();
  }, [currentSelection, currentType, currentAuthor]);

  return (
    <>
      <p className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-[42px] text-center py-8">NEWS</p>
      <Tag className="w-full">
        <div className="w-full h-7">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20} // 调整间距
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode]}
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
        </div>
      </Tag>

      <NewsListAll data={filteredPosts} />
    </>
  );
}

export default NewsSection;
