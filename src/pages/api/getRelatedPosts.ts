import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';

// API 處理函數，用於獲取相關文章
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 從請求中獲取標籤和排除的文章 ID
  const { tag, exclude, mode } = req.query;

  // 確保 tags 是一個陣列
  const tagsArray: string[] = JSON.parse(tag as string);
  // 設置文章目錄的基礎路徑
  const basePath = join(process.cwd(), 'src/Articals');

  // 讀取作者目錄
  const authorDirs = readdirSync(basePath);

  // 初始化相關文章的陣列
  let relatedPosts: PostProps[] = [];

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

      // console.log(`fileName: ${userID}/${fileName}, exclude: ${exclude}`);
      // 如果文章包含指定標籤中的至少一個且不是當前文章，則將其添加到相關文章陣列中
      if (`${userID}/${fileName}` !== `${exclude}.mdx`) {
        if (tagsArray.length > 0) {
          const hasAllTags = tagsArray.every((tag) => data.tags.includes(tag));
          const hasAnyTag = tagsArray.some((tag) => data.tags.includes(tag));

          if ((mode === 'all' && hasAllTags) || (mode !== 'all' && hasAnyTag)) {
            relatedPosts.push({
              ...data,
              id: fileName.replace(/\.mdx$/, ''),
              authorData: { id: userID }
            } as PostProps);
          }
        } else {
          relatedPosts.push({
            ...data,
            id: fileName.replace(/\.mdx$/, ''),
            authorData: { id: userID }
          } as PostProps);
        }
      }
    });
  });

  // 返回相關文章的 JSON 響應
  res.status(200).json(relatedPosts);
}
