import Image from 'next/image';
import { useState } from 'react';
import Tag from '../Tag/Tag';

interface PostProps {
  title: string;
  description: string;
  tags: string[];
  img: string;
  author: string;
  date: number;
}

const Post = (props: PostProps) => {
  const [time, setTime] = useState(new Date(props.date));

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-primary-black-300 dark:border-neutral-800">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          {/* 日期 */}
          {time.getFullYear()}/{time.getMonth()}/{time.getDate()}

          {/* 標籤 */}
          {
            props.tags.map((item, index) => {
              return (
                <Tag
                  key={index}
                  text={item}
                  className="gap-10"
                />
              )
            })
          }
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{props.title}</a></h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{props.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src={props.img}
            alt={props.author + ' avater'}
            className="w-7 h-7 rounded-full"
          />
          <span className="font-medium dark:text-white">
            {props.author}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post;
