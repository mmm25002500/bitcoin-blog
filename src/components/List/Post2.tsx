import Image from 'next/image';
import { useState } from 'react';
import Tag from '../Tag/Tag';
import { PostProps } from '@/types/List/PostData';

const Post2 = (props: PostProps) => {
  const time = new Date(props.date);

  const authorData = props.authorData;

  return (
    <div className="pt-6 pr-6 pl-6 pb-3 sm:pb-6 bg-white border-b-[1px] border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800">
      {/* 圖片 */}
      <div className='inline-flex items-center'>
        <Image
          src={props.img}
          alt={props.title}
          width={0}
          height={0}
          className="w-[9999px] sm:w-fit rounded-md"
        />
      </div>

      {/* 文章*/}
      <div className=''>
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

        {/* 標題 */}
        <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-neutral-black dark:text-white sm:dark:text-neutral-300"><a href="#">{props.title}</a></h2>

        {/* 描述 */}
        <div className="mb-5 font-light dark:text-neutral-300 text-neutral-800 sm:text-neutral-800 sm:dark:text-neutral-300 overflow-hidden">
          <p className='line-clamp-2 sm:line-clamp-1'>
            {props.description}
          </p>
        </div>
      </div>

      {/* 標籤 */}
      <div className="flex justify-between items-center text-gray-500">
        <span className="sm:inline-flex sm:items-center sm:gap-12">
          {/* 日期 */}
          <div className='mb-3 sm:mb-0 text-sm text-black dark:text-neutral-200 leading-5 font-medium'>
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
    </div>
  )
}

export default Post2;
