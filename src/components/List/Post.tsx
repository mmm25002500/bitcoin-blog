import Image from 'next/image';
import { useState } from 'react';
import Tag from '../Tag/Tag';
import { AuthorData } from '@/types/List/Author';

interface PostProps {
  title: string;
  description: string;
  tags: string[];
  img: string;
  authorData: AuthorData;
  date: number;
}

const Post = (props: PostProps) => {
  const time = new Date(props.date);

  const authorData = props.authorData;

  return (
    <div className="p-6 bg-white border-b-[1px] border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800">
      {/* 標籤 */}
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="inline-flex items-center gap-12">
          {/* 日期 */}
          <div className='text-sm text-black dark:text-neutral-200 leading-5 font-medium'>
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
                    className=""
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
        <div className='grow'>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-neutral-black dark:text-white"><a href="#">{props.title}</a></h2>
          <p className="mb-5 font-light text-neutral-800 dark:text-neutral-300">{props.description}</p>
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
                {props.authorData.name}
              </span>
            </div>
          </div>
        </div>
        {/* 圖片 */}
        <div className='inline-flex items-center'>
          <Image
            src={props.img}
            alt={props.title}
            width={200}
            height={200}
            className="w-32 h-32 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Post;
