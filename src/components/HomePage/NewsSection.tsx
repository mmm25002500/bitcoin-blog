import { useEffect, useState } from "react";
import axios from 'axios';
import { PostProps } from '@/types/List/PostData';
import Radio from "@/components/Radio/Radio";
import { NewsPostProps } from "@/types/HomePage/NewsSection";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';

import right from '@/icons/right.svg';
import left from '@/icons/left.svg';
import Image from 'next/image';
import NewsList from "../List/NewsList";
import { TagsProps } from "@/types/Tag/Tag";

interface NewsSectionProps extends NewsPostProps {
  tags: any;
}

const NewsSection = ({ initialPosts, initialSelection, tags, HomePageNewsListPerpage }: { initialPosts: PostProps[], initialSelection: string, tags: TagsProps, HomePageNewsListPerpage: number }) => {
  const [currentSelection, setCurrentSelection] = useState<string>(initialSelection);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(initialPosts);
  const [currentType, setCurrentType] = useState<string>('News');
  const [currentAuthor, setCurrentAuthor] = useState<string>('all');

  // 傳到後端拿資料，用TAG篩選文章
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      const response = await axios.get('/api/getPostsByFilter', {
        params: { type: 'both', author: currentAuthor, tag: currentSelection }
      });
      setFilteredPosts(response.data);
    };

    fetchFilteredPosts();
  }, [currentSelection, currentType, currentAuthor]);

  return (
    <div className="mt-8 my-2">
      {/* <p className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-[42px] text-center py-8">NEWS</p> */}
      <div className="relative mx-auto lg:px-20 w-full 2xl:w-[65%] mb-4">
        <div className="relative">
          <div className="relative w-auto h-7 mx-8">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20} // 調整間距
              freeMode={true}
              slidesPerGroup={2}
              loop={true}
              slidesOffsetAfter={0}
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

              {tags.all.map((tag: any, idx: number) => (
                <SwiperSlide
                  key={idx}
                  className="!w-auto"
                >
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
      </div>

      <div className="mx-auto lg:px-28 w-full 2xl:w-[65%]">
        <NewsList
          data={filteredPosts.map((post: PostProps) => ({
            title: post.title,
            description: post.description,
            tags: post.tags,
            date: post.date,
            authorData: {
              fullname: post.authorData.fullname,
              name: post.authorData.name,
              description: post.authorData.description,
              image: post.authorData.image,
              id: post.authorData.id,
            },
            type: post.type[0],
            img: post.authorData.image,
            image: post.image,
            id: post.id,
          })) as any}
          postsPerPage={HomePageNewsListPerpage}
        />
      </div>
    </div>
  );
}

export default NewsSection;
