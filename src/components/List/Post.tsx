import Image from 'next/image';
import { useState } from 'react';
import Tag from '../Tag/Tag';
import { PostProps } from '@/types/List/PostData';

const Post = (props: PostProps) => {
  const time = new Date(props.date);

  const authorData = props.authorData;

  return (
    <div className="pt-6 pr-6 pl-6 pb-3 sm:pb-6 bg-white border-b-[1px] border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800">
      {/* 標籤 */}
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="inline-flex items-center gap-4 sm:gap-12">
          {/* 日期 */}
          <div className='text-xs sm:text-sm text-black dark:text-neutral-200 leading-5 font-medium'>
            {time.getFullYear()}/{time.getMonth() + 1}/{time.getDate()}
            &nbsp;

            {time.getHours()}:{time.getMinutes()}
            &nbsp;

            {time.getHours() > 12 ? 'PM' : 'AM'}
          </div>

          {/* 標籤 */}
          <div className='flex gap-2'>
            {
              props.tags.map((item, index) => {
                return (
                  <Tag
                    key={index}
                    text={item}
                    className="text-xs py-1 px-3"
                  />
                )
              })
            }
          </div>
        </span>
      </div>
      {/* 左邊文章，右邊圖片 */}
      <div className='flex'>
        {/* 文章 */}
        <div className='grow basis-3/4'>
          {/* 標題 */}
          <h2 className="mb-2 text-base sm:text-2xl font-bold tracking-tight text-neutral-black dark:text-neutral-300 sm:text-neutral-black"><a href="#">{props.title}</a></h2>

          {/* 描述 */}
          <div className="mb-5 font-light text-neutral-800 dark:text-neutral-300 hidden sm:contents overflow-hidden">
            <p className="line-clamp-1">
              {props.description}
            </p>
          </div>

          {/* 作者 */}
          {
            authorData !== undefined ? (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={authorData.img}
                      alt={authorData.name + ' avater'}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="font-medium dark:text-white">
                      {authorData.name}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )
          }
        </div>

        {/* 圖片 */}
        <div className='inline-flex items-center'>
          <Image
            src={props.img}
            alt={props.title}
            width={0}
            height={0}
            className="ml-3 sm:ml-0 w-full h-fit rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Post;
