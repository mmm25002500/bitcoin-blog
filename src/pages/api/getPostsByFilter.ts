import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';
import { LawAuthorData } from '@/types/List/Author';
import { initAdmin } from '../../../lib/firebaseAdmin'; // 確保路徑正確

interface FilteredPostsProps extends PostProps {
  url: string;
}

// 動態設置 API URL
const getApiUrl = (req: NextApiRequest) => {
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
};

// 根據 userID 獲取作者資料
const getAuthorData = async (apiUrl: string): Promise<LawAuthorData[]> => {
  const res = await fetch(`${apiUrl}/api/getAuthorConfig`);
  if (!res.ok) {
    throw new Error(`Failed to fetch author data: ${res.statusText}`);
  }
  return res.json() as Promise<LawAuthorData[]>;
};

// 根據文件名獲取文章的元數據
const getPostsMetadata = async (filename: string, userID: string) => {
  const app = await initAdmin();
  const bucket = app.storage().bucket();
  const file = bucket.file(`Article/${userID}/${filename}.mdx`);
  const fileContentsArray = await file.download();
  const fileContents = fileContentsArray[0].toString('utf8');
  const { content, data } = matter(fileContents);

  return { content, data };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, author, tag, mode } = req.query;

  // 檢查參數是否有效
  if (
    typeof type !== 'string' ||
    (type !== 'Post' && type !== 'News' && type !== 'both') ||
    !author ||
    !tag
  ) {
    res.status(400).json({ error: '缺少或無效的 type, author 或 tag 參數' });
    return;
  }

  try {
    const apiUrl = getApiUrl(req);
    const authorData = await getAuthorData(apiUrl); // 從 API 獲取 Author.json

    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: 'Article/' });

    // 过滤掉无效的路径
    const validFiles = files.filter(file => file.name.split('/').length >= 3 && file.name.endsWith('.mdx'));

    let filteredPosts: FilteredPostsProps[] = [];

    // 如果 tag 是 all，則不進行標籤篩選
    const isAllTags = tag === 'all';
    const tagsArray: string[] = isAllTags ? [] : (tag as string).split(',');

    // 遍歷每篇文章文件
    for (const file of validFiles) {
      const parts = file.name.split('/');
      const userID = parts[1];
      const filenameWithExt = parts[2];
      const filename = filenameWithExt.replace('.mdx', '');

      if (author !== 'all' && userID !== author) {
        continue;
      }

      const { content, data } = await getPostsMetadata(filename, userID);

      // 獲取作者資料
      const postAuthor = authorData.find((author) => author.id === userID);

      // 篩選符合條件的文章
      const hasAllTags = tagsArray.every((tag) => data.tags.includes(tag));
      const hasAnyTag = tagsArray.some((tag) => data.tags.includes(tag));

      if (
        (type === 'both' || data.type.includes(type)) &&
        (isAllTags || (mode === 'all' && hasAllTags) || (mode === 'any' && hasAnyTag) || (!mode && hasAnyTag))
      ) {
        filteredPosts.push({
          ...data,
          id: filename,
          authorData: postAuthor ? {
            ...postAuthor,
            id: userID,
          } : {
            id: userID,
          },
          url: `/${type === 'News' ? 'News' : 'Post'}/${userID}/${filename}`
        } as FilteredPostsProps);
      }
    }

    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    res.status(500).json({ error: 'Error accessing Firebase Storage' });
  }
}
