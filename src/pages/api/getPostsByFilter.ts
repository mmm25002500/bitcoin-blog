import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';
import AuthorData from '@/config/Author.json';

// 根據 userID 獲取作者資料
const getAuthorData = (userID: string) => {
  return AuthorData.find((author) => author.id === userID);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, author, tag } = req.query;

  if (!type || !author || !tag) {
    res.status(400).json({ error: "缺少 type, author 或 tag 參數" });
    return;
  }

  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);
  let filteredPosts: PostProps[] = [];

  // 遍歷每個作者目錄
  authorDirs.forEach((userID) => {
    if (author !== 'all' && userID !== author) {
      return;
    }

    const articlesDirectory = join(basePath, userID);
    const fileNames = readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));

    // 遍歷每篇文章文件
    fileNames.forEach((fileName) => {
      const filePath = join(articlesDirectory, fileName);
      const fileContents = readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContents);
      const postAuthor = getAuthorData(userID);

      // 篩選符合條件的文章
      if (
        (type === 'Both' || data.type.includes(type)) &&
        data.tags.includes(tag)
      ) {
        filteredPosts.push({
          ...data,
          id: fileName.replace(/\.mdx$/, ''),
          authorData: postAuthor ? {
            ...postAuthor,
            id: userID,
          } : {
            id: userID,
          },
        } as PostProps);
      }
    });
  });

  // 根據 type 動態生成 URL
  filteredPosts = filteredPosts.map(post => {
    let urlType = 'Post';
    if (type === 'News') {
      urlType = 'News';
    }
    return {
      ...post,
      url: `/${urlType}/${post.authorData?.id}/${post.id}`
    };
  });

  res.status(200).json(filteredPosts);
}
