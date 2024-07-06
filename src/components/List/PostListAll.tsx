import React, { useState } from 'react';
import { PostListData } from "../../types/List/PostList";
import HorizontalLine from "../HorizontalLine";
import Post from "./Post";
import Pagination from '../Pagination/Pagination';
import { useRouter } from "next/router";
import { PostProps } from '@/types/List/PostData';
import postListConfig from '@/config/SiteConfig.json';

const PostList = ({ data }: PostListData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = postListConfig.PostListAllPerpage;

  const router = useRouter();

  // 以日期排序
  const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 計算當前頁的文章範圍
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);

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
