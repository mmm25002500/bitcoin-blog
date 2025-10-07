import React, { useState } from "react";
import type { PostListData } from "../../types/List/PostList";
import Post from "./Post";
import Pagination from "../Pagination/Pagination";
import type { PostProps } from "@/types/List/PostData";
import { parseDate } from "@/utils/dateParser";

const PostList = ({
  data,
  postsPerPage,
}: PostListData & { postsPerPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 以日期排序
  const sortedData = [...data].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

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
      {/* 電腦版 */}
      <div className="hidden sm:block">
        {currentPosts.map((post: PostProps, index) => {
          const parsedDate = parseDate(post.date); // 解析日期
          return (
            <React.Fragment key={post.title}>
              <Post
                href={`/${post.type}/${post.id}`}
                title={post.title}
                description={post.description}
                tags={post.tags}
                idx={index}
                date={parsedDate.toISOString()}
                type={["Post"]}
                image={post.image}
                className="px-5 sm:px-0"
                authorData={post.authorData}
              />
            </React.Fragment>
          );
        })}
      </div>

      {/* 手機板 */}
      <div className="sm:hidden">
        {currentPosts.map((post: PostProps, index) => {
          const parsedDate = parseDate(post.date); // 解析日期
          return (
            <React.Fragment key={post.title}>
              <Post
                href={`/${post.type}/${post.id}`}
                title={post.title}
                description={post.description}
                tags={post.tags}
                idx={index}
                date={parsedDate.toISOString()} // 轉換日期為 ISO 格式
                type={["News"]}
                image={post.image}
                img={post.img}
                authorData={post.authorData}
                className="px-5 sm:px-0"
              />
            </React.Fragment>
          );
        })}
      </div>

      {/* 分頁按鈕 */}
      <div className="flex justify-center py-10">
        <Pagination
          page={currentPage}
          pageSize={pageCount}
          link={""}
          onClick={(pageNumber: number) => paginate(pageNumber)}
          className={""}
        />
      </div>
    </>
  );
};

export default PostList;
