import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import HorizontalLine from "../HorizontalLine";
import Post from "./Post";
import Pagination from '../Pagination/Pagination';
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';

const PostList = ({ data }: PostListData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const router = useRouter();

  // 計算當前頁的文章範圍
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // 換頁函數
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 計算總頁數
  const pageCount = Math.ceil(data.length / postsPerPage);

  return (
    <>
      {currentPosts.map((post: PostProps, index) => (
        <Post
          key={index}
          onClick={() => router.push(`/Post/${post.authorData?.id}/${post.id}`)}
          {...post}
        />
      ))}

      {/* 分頁按鈕 */}
      <div className='flex justify-center py-10'>
        <Pagination
          page={currentPage}
          pageSize={pageCount}
          link={''}
          onClick={(pageNumber: number) => paginate(pageNumber)}
          className={''}
        />
      </div>
    </>
  );
}

export default PostList;
