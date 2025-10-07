import Image from "next/image";
import Link from "next/link";
import Tag from "../Tag/Tag";
import type { PostProps } from "@/types/List/PostData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import defalutPostImage from "@/icons/examplePhoto/defaultPostImage.jpg";
import { format } from "date-fns";
import clsx from "clsx";

const formatDate = (date: string) => {
  const d = new Date(date);
  return {
    date: format(d, "yyyy/MM/dd"),
    time: format(d, "hh:mm a"),
  };
};

const Post = (props: PostProps) => {
  const { date, time } = formatDate(props.date);

  return (
    <div
      className={clsx(
        "py-9 sm:pb-6 bg-white border-neutral-200",
        "dark:bg-primary-black-300 dark:border-neutral-800",
        props.className,
        props.idx !== 0 && "border-t-[1px]"
      )}
    >
      {/* 左邊文章，右邊圖片 */}
      <div className="flex gap-2">
        {/* 文章 */}
        <div className="basis-3/4 grid grid-row-2 content-between">
          {/* 標題 */}
          <h1 className="sm:mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-black dark:text-neutral-white sm:text-neutral-black cursor-pointer">
            {props.href ? (
              <Link href={props.href} className="text-left" aria-label={props.title}>
                <p className="line-clamp-2">{props.title}</p>
              </Link>
            ) : (
              <button type="button" onClick={props.onClick} className="text-left" aria-label={props.title}>
                <p className="line-clamp-2">{props.title}</p>
              </button>
            )}
          </h1>
          {/* 描述 */}
          <span className="">
            <div className="font-light text-neutral-800 dark:text-neutral-300 hidden sm:flex sm:text-xl">
              <p className="line-clamp-2">{props.description}</p>
            </div>
          </span>
        </div>
        {/* 圖片 */}
        <div className="inline-flex items-center relative w-auto h-auto max-w-[120px] sm:max-w-[236px]">
          {props.image && props.image !== "" ? (
            <Image
              src={props.image as string}
              alt="圖片載入失敗，請檢查網址"
              width={236}
              height={152}
              className="w-auto h-auto max-h-[78px] sm:max-h-[152px] rounded-md"
            />
          ) : (
            <Image
              src={defalutPostImage}
              alt="圖片載入失敗，請檢查網址"
              className="w-auto h-auto max-h-[78px] sm:max-h-[152px] rounded-md"
            />
          )}
        </div>
      </div>

      {/* 手機版描述 */}
      <span className="sm:hidden">
        <div className="my-2 font-light text-neutral-800 dark:text-neutral-300 flex sm:text-xl">
          <p className="line-clamp-2">{props.description}</p>
        </div>
      </span>

      <div className="my-3 flex justify-end">
        <div className="max-w-[70%]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={8}
            freeMode={true}
            modules={[FreeMode]}
            className="h-8"
          >
            {props.tags.map(
              (item, index) =>
                index < 3 && (
                  <SwiperSlide
                    key={item}
                    className="!w-auto max-w-full cursor-pointer"
                  >
                    <Tag
                      key={item}
                      text={item}
                      type={props.type}
                      className="!text-[11px] sm:!text-sm px-2 py-1 sm:py-1 sm:px-3 text-xs  cursor-pointer"
                    />
                  </SwiperSlide>
                ),
            )}
          </Swiper>
        </div>
      </div>

      <div className="flex w-full items-center h-6">
        <div className="grow">
          {/* 作者 */}
          {props.authorData && (
            <Link
              href={`/Author/${props.authorData.id}`}
              className="flex items-center space-x-2"
              aria-label={`查看作者 ${props.authorData.name} 的頁面`}
            >
              {props.authorData?.image && (
                <Image
                  src={props.authorData.image}
                  alt={`${props.authorData.name} avatar`}
                  width={28}
                  height={28}
                  className="w-[14px] h-[14px] sm:w-5 sm:h-5 rounded-full"
                />
              )}
              {props.authorData?.name && (
                <span className="font-medium dark:text-white text-xs sm:text-base">
                  {props.authorData.name}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* 日期 */}
        <div className="text-xs sm:text-sm text-black dark:text-neutral-200 leading-5 font-medium flex w-auto mr-4 cursor-default">
          <p className="whitespace-nowrap">
            {date}
            <span className="inline-block w-4" />
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
