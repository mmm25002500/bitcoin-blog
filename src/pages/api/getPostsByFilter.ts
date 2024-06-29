import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';

// API 處理函數，用於根據標籤篩選文章
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag } = req.query;

  // 如果沒有提供標籤參數，返回 400 錯誤
  if (!tag) {
    res.status(400).json({ error: "Missing tag parameter" });
    return;
  }

  // 設置文章目錄的基礎路徑
  const basePath = join(process.cwd(), 'src/Articals');
  // 讀取作者目錄
  const authorDirs = readdirSync(basePath);
  // 初始化過濾後的文章陣列
  let filteredPosts: PostProps[] = [];

  // 遍歷每個作者目錄
  authorDirs.forEach((userID) => {
    // 設置每個作者文章目錄的路徑
    const articlesDirectory = join(basePath, userID);
    // 讀取文章目錄下的所有文件名，過濾出以 .mdx 結尾的文件
    const fileNames = readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));

    // 遍歷每個文章文件
    fileNames.forEach((fileName) => {
      // 設置文章文件的路徑
      const filePath = join(articlesDirectory, fileName);
      // 讀取文章文件的內容
      const fileContents = readFileSync(filePath, 'utf8');
      // 使用 gray-matter 解析文章內容中的元數據
      const { data } = matter(fileContents);

      // 如果文章包含指定標籤，則將其添加到過濾後的文章陣列中
      if (data.tags.includes(tag)) {
        filteredPosts.push({ ...data, id: fileName.replace(/\.mdx$/, '') } as PostProps);
      }
    });
  });

  // 返回過濾後的文章的 JSON 響應
  res.status(200).json(filteredPosts);
}
