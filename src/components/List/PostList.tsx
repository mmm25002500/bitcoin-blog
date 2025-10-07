import React, { useState } from "react";
import type { PostListData } from "../../types/List/PostList";
import Post from "./Post";
import Pagination from "../Pagination/Pagination";
import type { PostProps } from "@/types/List/PostData";

const PostList = ({ data }: PostListData) => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	// 以日期排序
	const sortedData = data.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

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
					key={post.title}
					idx={index}
					href={`/Post/${post.id}`}
					{...post}
					className="px-5 sm:px-0"
				/>
			))}

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
