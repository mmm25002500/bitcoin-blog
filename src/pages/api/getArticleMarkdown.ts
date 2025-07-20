import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "../../../lib/firebaseAdmin";
import matter from "gray-matter";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { userID, postID } = req.query;

	if (!userID || !postID) {
		return res.status(400).json({ error: "缺少 userID 及 postID" });
	}

	try {
		const app = await initAdmin();
		const bucket = app.storage().bucket();
		const file = bucket.file(`Article/${userID}/${postID}.mdx`);

		const [exists] = await file.exists();
		if (!exists) {
			return res.status(404).json({ error: "找不到文章" });
		}

		const fileContentsArray = await file.download();
		const fileContents = fileContentsArray[0].toString("utf8");
		const { content, data } = matter(fileContents);

		return res.status(200).json({ content, data });
	} catch (error) {
		console.error("Error accessing Firebase Storage:", error);
		return res.status(500).json({ error: "Error accessing Firebase Storage" });
	}
}
