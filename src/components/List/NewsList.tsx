import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import Post from "./Post";
import Button from '../Button/Button';
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';

const PostList = (props: PostListData) => {
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  // 以日期排序
  const sortedData = props.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 先六個
  const postsToShow = showAll ? sortedData : sortedData.slice(0, 6);

  return (
    <>

      {postsToShow.map((post: PostProps, index) => (
        <Post
          key={index}
          onClick={() => router.push(`/News/${post.authorData?.id}/${post.id}`)}
          title={post.title}
          description={post.description}
          tags={post.tags}
          idx={index}
          date={post.date}
          type={["News"]}
          image={post.image}
          img={post.img}
          authorData={post.authorData}
        />
      ))}

      {/* 查看更多 */}
      {!showAll && (
        <div className='flex justify-center py-10'>
          <Button
            onClick={() => setShowAll(true)}
            type="large"
            className="dark:!border-neutral-white dark:!bg-neutral-white dark:!text-primary-black-300 flex items-center gap-2 w-44 justify-center bg-neutral-black text-neutral-white">
            More
          </Button>
        </div>
      )}
    </>
  );
}

export default PostList;
