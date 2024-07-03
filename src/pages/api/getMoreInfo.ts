import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import AuthorData from '@/config/Author.json';
import MoreInfo from '@/config/MoreInfo.json';
import { PostProps } from '@/types/List/PostData';

// 根據 userID 獲取作者資料
const getAuthorData = (userID: string) => {
  return AuthorData.find((author) => author.id === userID);
}

// 根據文件名獲取文章的元數據
const getPostsMetadata = (filename: string) => {
  const basePath = join(process.cwd(), 'src/Articals'); // 設定文章資料夾的基準路徑
  const authorDirs = readdirSync(basePath); // 讀取基準路徑下所有作者目錄

  for (const userID of authorDirs) { // 遍歷每個作者目錄
    const userDir = join(basePath, userID); // 獲取每個作者的目錄路徑
    const userFiles = readdirSync(userDir); // 讀取每個作者目錄下的文件

    // 檢查當前作者目錄下是否包含指定的文件名
    if (userFiles.includes(`${filename}.mdx`)) {
      const filePath = join(userDir, `${filename}.mdx`); // 獲取文件的完整路徑
      const fileContents = readFileSync(filePath, 'utf8'); // 讀取文件內容
      const { data } = matter(fileContents); // 解析文件的元數據
      const postAuthor = getAuthorData(userID); // 獲取作者資料

      // 返回包含文章元數據和作者資料的對象
      return {
        title: data.title || '',
        authorData: postAuthor ? {
          fullname: postAuthor.fullname,
          name: postAuthor.name,
          img: postAuthor.image,
          description: postAuthor.description,
          id: userID,
        } : {
          id: userID,
        },
        date: data.date || '',
        description: data.description || '',
        link: `${userID}/${filename}`
      };
    }
  }
  return null; // 如果未找到文件，返回 null
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 遍歷 MoreInfo.json 中的每個類別
  const result = MoreInfo.map(category => {
    // 對每個類別中的每篇文章進行處理
    const posts = category.post.map(post => {
      const metadata = getPostsMetadata(post.filename); // 獲取文章的元數據
      return {
        ...post,
        ...metadata
      };
    }).filter(post => post.title); // 過濾掉未找到的文章
    return {
      ...category,
      post: posts
    };
  });

  res.status(200).json(result); // 返回結果
}
