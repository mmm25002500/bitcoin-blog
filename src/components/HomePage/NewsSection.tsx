import NewsList from "../List/NewsList";
import { NewsProps } from "@/types/User/UserID";
import Tag from "../Tag/TagTab";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode } from 'swiper/modules';

const NewsSection = ({ posts }: NewsProps) => {

  return (
    <>
      <p className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-[42px] text-center py-8">NEWS</p>
      <Tag className="w-full">
        <div className="lg:hidden">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={"20%"} // 根據需要調整間距
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="w-full bg-gradient-to-r from-black to-white inline-block text-transparent bg-clip-text"
          >
            <SwiperSlide>
              <div className="flex gap-5 w-[120%]">
                <Tag.Tab text="ALL" />
                <Tag.Tab text="Software Developemnt" />
                <Tag.Tab text="JavaScript" />
                <Tag.Tab text="Technology" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex gap-5 w-[120%]">
                <Tag.Tab text="Coding" />
                <Tag.Tab text="Web Development" />
                <Tag.Tab text="Web Development" />
                <Tag.Tab text="Python" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex gap-5 w-[120%]">
                <Tag.Tab text="Machine Learning" />
                <Tag.Tab text="Machine Learning" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full gap-5 py-4 hidden lg:flex">
          <Tag.Tab text="ALL" />
          <Tag.Tab text="Software Developemnt" />
          <Tag.Tab text="JavaScript" />
          <Tag.Tab text="Technology" />
          <Tag.Tab text="Coding" />
          <Tag.Tab text="Web Development" />
          <Tag.Tab text="Web Development" />
          <Tag.Tab text="Python" />
          <Tag.Tab text="Machine Learning" />
          <Tag.Tab text="Machine Learning" />
        </div>
      </Tag>

      <NewsList
        data={posts.map((post) => ({
          title: post.title,
          description: post.description,
          tags: post.tags,
          date: typeof post.date === 'string' ? Date.parse(post.date) : post.date,
          authorData: {
            fullname: post.authorData.fullname,
            name: post.authorData.name,
            description: post.authorData.description,
            img: post.authorData.image,
            id: post.authorData.id,
          },
          img: post.img,
          image: post.image,
          id: post.id,
        }))}
      />
    </>
  );
}

export default NewsSection;
