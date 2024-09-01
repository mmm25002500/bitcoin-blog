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

  return `${year}/${month}/${day} ${formattedHours}:${minutes} ${ampm}`;
};

const Post = (props: PostProps) => {
  const formattedDate = formatDate(props.date);
  const router = useRouter();

  return (
    <div
      className={`pt-6 pb-3 sm:pb-6 bg-white border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800 ${props.className} ${props.idx != 0 ? 'border-t-[1px]' : ''}`}
    >
      {/* 標籤與日期 */}
      <div className="mb-5 text-gray-500">
        <div className="flex items-center sm:gap-12">
          {/* 日期 */}
          <div className='text-xs sm:text-sm text-black dark:text-neutral-200 leading-5 font-medium flex sm:grow
          w-auto mr-4'>
            <p className='whitespace-nowrap'>{formattedDate}</p>
          </div>

          {/* 標籤 */}
          <div className='flex gap-2 relative overflow-hidden'>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={8} // 調整間距
              freeMode={true}
              modules={[FreeMode]}
              className="h-8"
            >
              {
                props.tags.map((item, index) => (
                  <SwiperSlide key={index} className="!w-auto max-w-full">
                    <Tag
                      key={index}
                      text={item}
                      type={props.type}
                      className="text-xs py-1 px-3"
                    />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
      {/* 左邊文章，右邊圖片 */}
      <div className='flex gap-2' onClick={props.onClick}>
        {/* 文章 */}
        <div className='flex-grow basis-3/4 flex flex-col justify-between'>
          <div>
            {/* 標題 */}
            <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-neutral-black dark:text-neutral-white sm:text-neutral-black">
              <p className='line-clamp-2'>{props.title}</p>
            </h2>
            {/* 描述 */}
            <div className="mb-5 font-light text-neutral-800 dark:text-neutral-300 hidden sm:contents overflow-hidden">
              <p className="line-clamp-1">
                {props.description}
              </p>
            </div>
          </div>
          {/* 作者 */}
          {
            props.authorData && (
              <div
                onClick={() => { router.push(`/Author/${props.authorData.id}`) }}
                className="flex items-center space-x-4 mt-auto"
              >
                {
                  props.authorData.image && (
                    <Image
                      src={props.authorData.image}
                      alt={props.authorData.name + ' avatar'}
                      width={28}
                      height={28}
                      className="w-5 h-5 sm:w-7 sm:h-7 rounded-full"
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
              </div>
            )
          }
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
    </div>
  )
}

export default Post;
