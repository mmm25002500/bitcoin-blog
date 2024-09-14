import Image from 'next/image';
import Tag from '../Tag/Tag';
import { PostProps } from '@/types/List/PostData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import defalutPostImage from '@/icons/examplePhoto/defaultPostImage.jpg';
import { useRouter } from 'next/router';

const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // Months are zero-indexed
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
  let date_time = "";

  if (month < 10) {
    date_time = `${year}/0${month}`;
  } else {
    date_time = `${year}/${month}`;
  }

  if (day < 10) {
    date_time += `/0${day}`;
  } else {
    date_time += `/${day}`;
  }

  if (hours > 12) {
    let formattedHours = hours % 12;
    if (formattedHours < 10) {
      date_time += ` 0${formattedHours}:${minutes} PM`;
    } else {
      date_time += ` ${formattedHours}:${minutes} PM`;
    }
  } else {
    if (hours < 10) {
      date_time += ` 0${hours}:${minutes} AM`;
    } else {
      date_time += ` ${hours}:${minutes} AM`;
    }
  }

  return date_time;
};

const Post = (props: PostProps) => {
  const formattedDate = formatDate(props.date);
  const router = useRouter();

  return (
    <div
      className={`py-9 sm:pb-6 bg-white border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800 ${props.className} ${props.idx != 0 ? 'border-t-[1px]' : ''}`}
    >
      {/* 左邊文章，右邊圖片 */}
      <div className='flex gap-2'>
        {/* 文章 */}
        <div className='basis-3/4 grid grid-row-2 content-between'>
          {/* 標題 */}
          <h2
            className="sm:mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-black dark:text-neutral-white sm:text-neutral-black cursor-pointer"
            onClick={props.onClick}
          >
            <p className='line-clamp-2'>{props.title}</p>
          </h2>
          {/* 描述 */}
          <span className=''>
            <div className="font-light text-neutral-800 dark:text-neutral-300 hidden sm:flex sm:text-xl">
              <p className="line-clamp-2">
                {props.description}
              </p>
            </div>
          </span>
        </div>
        {/* 圖片 */}
        <div className='inline-flex items-center relative w-auto h-auto max-w-[120px] sm:max-w-[236px]'>
          {
            props.image && props.image !== '' ? (
              <img
                src={props.image as string}
                alt="圖片載入失敗，請檢查網址"
                className="w-auto h-auto max-h-[78px] sm:max-h-[152px] rounded-md"
              />
            ) : (
              <Image
                src={defalutPostImage}
                alt="圖片載入失敗，請檢查網址"
                className="w-auto h-auto max-h-[78px] sm:max-h-[152px] rounded-md"
              />
            )
          }
        </div>
      </div>

      <span className=''>
        <div className="my-2 font-light text-neutral-800 dark:text-neutral-300 flex sm:text-xl">
          <p className="line-clamp-2">
            {props.description}
          </p>
        </div>
      </span>

      <div className='my-3 flex justify-end'>
        <div className='max-w-[70%]'>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            freeMode={true}
            modules={[FreeMode]}
            className="h-8"
          >
            {
              props.tags.map((item, index) => (
                index < 3 && <SwiperSlide key={index} className="!w-auto max-w-full cursor-pointer">
                  <Tag
                    key={index}
                    text={item}
                    type={props.type}
                    className="!text-[11px] px-2 sm:text-xs sm:py-1 sm:px-3 cursor-pointer"
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>


      <div className='flex w-full items-center'>
        <div className='grow'>
          {/* 作者 */}
          {
            props.authorData && (
              <button
                onClick={() => { router.push(`/Author/${props.authorData.id}`) }}
                className="flex items-center space-x-2"
              >
                {
                  props.authorData.image && (
                    <Image
                      src={props.authorData.image}
                      alt={props.authorData.name + ' avatar'}
                      width={28}
                      height={28}
                      className="w-[14px] h-[14px] sm:w-5 sm:h-5 rounded-full"
                    />
                  )
                }
                {
                  props.authorData.name && (
                    <span className="font-medium dark:text-white text-xs sm:text-base">
                      {props.authorData.name}
                    </span>
                  )
                }
              </button>
            )
          }
        </div>

        {/* 日期 */}
        <div className='text-xs sm:text-sm text-black dark:text-neutral-200 leading-5 font-medium flex w-auto mr-4 cursor-default'>
          <p className='whitespace-nowrap'>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Post;
