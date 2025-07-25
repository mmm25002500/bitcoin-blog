import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { text } = req.query;

	// 檢查 text 參數是否有效
	if (!text || typeof text !== "string") {
		return res.status(400).json({ error: "Invalid or missing text parameter" });
	}

	try {
		const app = await initAdmin();
		const bucket = app.storage().bucket();
		const file = bucket.file("config/Author.json");

		// 檢查檔案是否存在
		const [exists] = await file.exists();
		if (!exists) {
			return res.status(404).json({ error: "Author file not found" });
		}

		// 下載檔案內容
		const fileContentsArray = await file.download();
		const fileContents = fileContentsArray[0];
		const authorData = JSON.parse(fileContents.toString("utf8"));

		// 過濾作者資料
		const filteredAuthors = authorData.filter(
			(author: { description: string }) => author.description.includes(text),
		);

		// 回傳過濾後的作者資料
		res.status(200).json(filteredAuthors);
	} catch (error) {
		console.error("Error accessing Firebase Storage:", error);
		return res.status(500).json({ error: "Error accessing Firebase Storage" });
	}
}
