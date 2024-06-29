import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import HorizontalLine from "../HorizontalLine";
import Post from "./Post";
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';
import Button from '../Button/Button';
import Icon from '../Icon';
import right from '@/icons/right.svg';

const PostList2 = ({ data }: PostListData) => {
  const [visibleCount, setVisibleCount] = useState(2); // 初始顯示的文章數量
  const increment = 2; // 每次增加的文章數量

  const router = useRouter();

  // 顯示當前的文章
  const currentPosts = data.slice(0, visibleCount);

  // 點擊按鈕時增加顯示的文章數量
  const showMorePosts = () => {
    setVisibleCount(prevCount => prevCount + increment);
  };

  return (
    <>
      {currentPosts.map((post: PostProps, index) => (
        <Post
          key={index}
          idx={index}
          onClick={() => router.push(`/Post/${post.authorData?.id}/${post.id}`)}
          title={post.title}
          description={post.description}
          tags={post.tags}
          date={post.date}
          type={post.type}
          image={post.image}
        />
      ))}

      <HorizontalLine className="" />

      <div className='flex items-center justify-center my-7'>
        {/* 如果還有更多文章則顯示按鈕 */}
        {visibleCount < data.length && (
          <Button
            onClick={showMorePosts}
            type={"large"}
            className="font-medium text-sm leading-5 dark:!bg-neutral-white dark:!text-primary-black-300 dark:border-neutral-white flex items-center gap-2">
            顯示更多
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

export default PostList2;
