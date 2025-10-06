import React, { useState } from "react";
import type { PostListData } from "../../types/List/PostList";
import Post from "./Post";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import type { PostProps } from "@/types/List/PostData";
import { parse, isValid } from "date-fns";

const PostList = ({
	data,
	postsPerPage,
}: PostListData & { postsPerPage: number }) => {
	const [postsToShow, setPostsToShow] = useState(6);

	const router = useRouter();

	// 解析日期字符串
	const parseDate = (dateString: string): Date => {
		if (typeof dateString !== "string") {
			console.error(`Invalid date format: ${dateString}`);
			return new Date(); // 回傳當前日期作為預設值
		}

		// 嘗試直接解析 ISO 8601 格式或標準日期字符串
		let date = new Date(dateString);

		// 如果直接解析失敗,嘗試使用 date-fns 解析 yyyy-MM-dd HH:mm 格式
		if (!isValid(date)) {
			date = parse(dateString, "yyyy-MM-dd HH:mm", new Date());
		}

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

	// 顯示的文章數量
	const displayedPosts = sortedData.slice(0, postsToShow);

	// 處理按下按鈕時顯示更多文章
	const handleShowMore = () => {
		setPostsToShow((prevPostsToShow) =>
			Math.min(prevPostsToShow + postsPerPage, sortedData.length),
		);
	};

	return (
		<>
			{displayedPosts.map((post: PostProps, index) => {
				const parsedDate = parseDate(post.date); // 解析日期
				return (
					<div key={post.title}>
						<Post
							key={post.title}
							onClick={() =>
								router.push(`/${post.type}/${post.id}`)
							}
							title={post.title}
							description={post.description}
							tags={post.tags}
							idx={index}
							date={parsedDate.toISOString()}
							type={post.type}
							image={post.image}
							img={post.img}
							authorData={post.authorData}
						/>
						{index === sortedData.length - 1 && <div className="pb-20" />}
					</div>
				);
			})}

			{/* 查看更多按鈕 */}
			{postsToShow < sortedData.length && (
				<div className="flex justify-center pt-16 pb-20">
					<Button
						onClick={handleShowMore}
						type="large"
						className="dark:!border-neutral-white dark:!bg-neutral-white dark:!text-primary-black-300 flex items-center gap-2 w-44 justify-center bg-neutral-black text-neutral-white"
					>
						更多
					</Button>
				</div>
			)}
		</>
	);
};

export default PostList;
