import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import HorizontalLine from "../HorizontalLine";
import Post from "./Post";
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';
import Button from '../Button/Button';
import Icon from '../Icon';
import right from '@/icons/right.svg';
import { parse, isValid } from 'date-fns';

const ArticlePostList = ({ data, ArticlePostListMorePostPerclick }: PostListData & {ArticlePostListMorePostPerclick: number}) => {
  const [visibleCount, setVisibleCount] = useState(3); // 初始顯示的文章數量
  const increment = ArticlePostListMorePostPerclick; // 每次增加的文章數量

  const router = useRouter();

  // 解析日期字串
  const parseDate = (dateString: string): Date => {
    if (typeof dateString !== 'string') {
      console.error(`Invalid date format: ${dateString}`);
      return new Date(); // 回傳當前日期作為預設值
    }
    const date = parse(dateString, 'yyyy-MM-dd HH:mm', new Date());
    if (!isValid(date)) {
      console.error(`Invalid date format: ${dateString}`);
      return new Date(); // 回傳當前日期作為預設值
    }
    return date;
  };

  // 以日期排序
  const sortedData = data.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // 顯示當前的文章
  const currentPosts = sortedData.slice(0, visibleCount);

  // 點擊按鈕時增加顯示的文章數量
  const showMorePosts = () => {
    setVisibleCount(prevCount => prevCount + increment);
  };

  return (
    <>
      {currentPosts.map((post: PostProps, index) => {
        const parsedDate = parseDate(post.date); // 解析日期
        return (
          <Post
            key={index}
            idx={index}
            onClick={() => router.push(`/Post/${post.authorData?.id}/${post.id}`)}
            title={post.title}
            description={post.description}
            tags={post.tags}
            date={parsedDate.toISOString()}
            type={post.type}
            image={post.image}
            authorData={post.authorData}
          />
        )
      })}

      {/* <HorizontalLine className="" /> */}

      <div className='flex justify-center pt-16 pb-20'>
        {/* 如果還有更多文章則顯示按鈕 */}
        {visibleCount < data.length && (
          <Button
            onClick={showMorePosts}
            type={"large"}
            className="font-medium text-sm leading-5 dark:!bg-neutral-white dark:!text-primary-black-300 dark:border-neutral-white flex items-center gap-2">
            更多
            <Icon
              icon_light={right}
              className="invert dark:invert-0"
            />
          </Button>
        )}
      </div>
    </>
  );
}

export default ArticlePostList;
