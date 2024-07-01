import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import Post from "./Post";
import Button from '../Button/Button';
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';

const PostList = ({ data }: PostListData) => {
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  // 先六個
  const postsToShow = showAll ? data : data.slice(0, 6);

  return (
    <>
      {postsToShow.map((post: PostProps, index) => (
        <div
          key={index}
          onClick={() => router.push(`/Post/${post.authorData?.id}/${post.id}`)}
        >
          <Post {...post} idx={ index } />
        </div>
      ))}

      {/* 查看更多 */}
      {!showAll && (
        <div className='flex justify-center py-10'>
          <Button
            onClick={() => setShowAll(true)}
            type="large"
            className="dark:border-neutral-white dark:bg-neutral-white dark:text-primary-black-300 flex items-center gap-2">
            More
          </Button>
        </div>
      )}
    </>
  );
}

export default PostList;
