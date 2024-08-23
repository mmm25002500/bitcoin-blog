import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import IMG from '@/icons/examplePhoto/S__4964469.jpg';
import IMG2 from '@/icons/examplePhoto/S__4964468.jpg';
import IMG3 from '@/icons/examplePhoto/S__4988942.png';
import Right from '@/icons/right.svg';
import Icon from "../Icon";
import Button from "../Button/Button";

const SwiperSection = () => {

  const pagination = {
    clickable: true,
    bulletClass: `swiper-pagination-bullet custom-bullet`, // 使用自定義樣式
    bulletActiveClass: `swiper-pagination-bullet-active custom-bullet-active`, // 使用自定義樣式
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      className="h-[500px]"
    >
      <SwiperSlide>
        <div className="relative">
          <div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28">
            <p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
              🚧 網站施工測試中
            </p>
            <p className="text-white font-normal text-sm leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
              🚧 網站施工測試中
            </p>
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url('${IMG.src}')`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-[500px]"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28">
            <p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
              比特幣 改變金融的貨幣
            </p>
            <p className="text-white font-normal text-sm leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
              了解比特幣 <br />以及正在改變的現代世界
            </p>
          </div>
          <Button
            type={"small"}
            onClick={() => console.log('test')}
            className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7"
          >
            <p>開始</p>
            <Icon
              icon_light={Right}
              icon_dark={Right}
              className="dark:invert"
            />
          </Button>
          <div
            style={{
              backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url('${IMG.src}')`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-[500px]"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28">
            <p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
              比特幣 錢包
            </p>
            <p className="text-white font-normal text-sm leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
              進入資產安全自主 <br />最重要的第一步
            </p>
          </div>
          <Button
            type={"small"}
            onClick={() => console.log('test')}
            className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7"
          >
            <p>開始</p>
            <Icon
              icon_light={Right}
              icon_dark={Right}
              className="dark:invert"
            />
          </Button>
          <div
            style={{
              backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url('${IMG2.src}')`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-[500px]"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <div className="absolute pt-28 sm:pt-10 md:pt-20 px-12 sm:px-10 md:px-12 sm:pl-14 md:pl-28">
            <p className="text-white uppercase font-black text-2xl leading-[32.78px] sm:text-5xl sm:leading-[65px] tracking-wider">
              比特幣 購買
            </p>
            <p className="text-white font-normal text-sm leading-6 sm:text-[33px] sm:leading-[55px] mt-5 tracking-wider">
              第一個比特幣 <br />選擇最安全的交易
            </p>
          </div>
          <Button
            type={"small"}
            onClick={() => console.log('test')}
            className="absolute bottom-0 m-24 pt-3 pb-3 pr-10 pl-10 flex items-center gap-3 mt-10 sm:mt-7"
          >
            <p>開始</p>
            <Icon
              icon_light={Right}
              icon_dark={Right}
              className="dark:invert"
            />
          </Button>
          <div
            style={{
              backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url('${IMG3.src}')`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-[500px]"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default SwiperSection;
