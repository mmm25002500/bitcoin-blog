import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "../../../lib/firebaseAdmin";
import matter from "gray-matter";
import type { LawAuthorData } from "@/types/List/Author";

// 根據 userID 取得作者資料
const getAuthorData = async (
	userID: string,
): Promise<LawAuthorData | undefined> => {
	const app = await initAdmin();
	const bucket = app.storage().bucket();
	const file = bucket.file("config/Author.json");
	const fileContentsArray = await file.download();
	const fileContents = fileContentsArray[0];
	const authorData: LawAuthorData[] = JSON.parse(fileContents.toString("utf8"));
	return authorData.find((author: LawAuthorData) => author.id === userID);
};

// 根據檔案名取得文章的元數據
const getPostsMetadata = async (filename: string) => {
	const app = await initAdmin();
	const bucket = app.storage().bucket();
	const [files] = await bucket.getFiles({ prefix: "Article/" });

	for (const file of files) {
		if (file.name.endsWith(`${filename}.mdx`)) {
			const userID = file.name.split("/")[1];
			const fileContentsArray = await file.download();
			const fileContents = fileContentsArray[0].toString("utf8");
			const { data } = matter(fileContents);
			const postAuthor = await getAuthorData(userID);

			return {
				title: data.title || "",
				authorData: postAuthor
					? {
							fullname: postAuthor.fullname,
							name: postAuthor.name,
							img: postAuthor.image,
							description: postAuthor.description,
							id: userID,
						}
					: {
							id: userID,
						},
				date: data.date || "",
				description: data.description || "",
				link: `${userID}/${filename}`,
			};
		}
	}
	return null;
};

// 取得 MoreInfo.json 檔案
const getMoreInfo = async () => {
	const app = await initAdmin();
	const bucket = app.storage().bucket();
	const file = bucket.file("config/MoreInfo.json");
	const fileContentsArray = await file.download();
	const fileContents = fileContentsArray[0];
	const moreInfo = JSON.parse(fileContents.toString("utf8"));
	return moreInfo;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const moreInfo = await getMoreInfo(); // 從 Firebase 取得 MoreInfo.json

		// 遍歷 MoreInfo.json 中的每個類別
		const result = await Promise.all(
			moreInfo.map(async (category: any) => {
				// 對每個類別中的每篇文章進行處理
				const posts = await Promise.all(
					category.post.map(async (post: any) => {
						const metadata = await getPostsMetadata(post.filename); // 取得文章的元數據
						return {
							...post,
							...metadata,
						};
					}),
				);
				return {
					...category,
					post: posts.filter((post: any) => post.title), // 過濾掉未找到的文章
				};
			}),
		);

		res.status(200).json(result); // 回傳結果
	} catch (error) {
		console.error("Error accessing Firebase Storage:", error);
		res.status(500).json({ error: "Error accessing Firebase Storage" });
	}
}
