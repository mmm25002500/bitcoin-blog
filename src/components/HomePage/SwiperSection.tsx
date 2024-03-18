import { Swiper, SwiperSlide } from "swiper/react";

import IMG from '@/icons/examplePhoto/Image Container.png'
import Right from '@/icons/right.svg'
import Icon from "../Icon";

// import required modules
import { Pagination } from 'swiper/modules';
import Button from "../Button/Button";

const SwiperSection = () => {

  // const pagination = {
  //   clickable: true,
  //   bulletClass: `swiper-pagination-bullet `, // 使用自定義樣式
  //   bulletActiveClass: `swiper-pagination-bullet-active `, // 使用自定義樣式
  //   renderBullet: function (index: number, className: string) {
  //     return '<span class="' + className + '"></span>';
  //   },
  // };

  return (
    <Swiper
      // pagination={pagination}
      modules={[Pagination]}
    >
      <SwiperSlide>
        <div className="relative">
          <div className="absolute p-24">
            <p className="text-white uppercase font-black text-5xl leading-[65px]">
              A dedicated team to <br />
              grow your company
            </p>
            <p className="text-white font-normal text-lg leading-[30px] mt-5">
              Lorem ipsum dolor sit amet consectetur adipiscing eli <br /> mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
            </p>
            <Button
              type={"small"}
              onClick={() => console.log('test')}
              className="pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-7"
            >
              <p>Get Started</p>
              <Icon
                icon_light={Right}
              />
            </Button>
          </div>
          <Icon
            icon_light={IMG}
            className="w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <div className="absolute p-24">
            <p className="text-white uppercase font-black text-5xl leading-[65px]">
              這是大標題
            </p>
            <p className="text-white font-normal text-lg leading-[30px]">
              文字文字文字
            </p>
          </div>
          <Icon
            icon_light={IMG}
            className="w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <div className="absolute p-24">
            <p className="text-white uppercase font-black text-5xl leading-[65px]">
              這是大標題
            </p>
            <p className="text-white font-normal text-lg leading-[30px]">
              文字文字文字
            </p>
          </div>
          <Icon
            icon_light={IMG}
            className="w-full"
          />
        </div>
      </SwiperSlide>
    </Swiper >
  );
}

export default SwiperSection;
