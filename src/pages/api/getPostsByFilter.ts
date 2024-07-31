import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';
import { LawAuthorData } from '@/types/List/Author';
import { initAdmin } from '../../../lib/firebaseAdmin'; // 確保路徑正確

interface FilteredPostsProps extends PostProps {
  url: string;
}

interface FileType {
  name: string;
}

// 動態設置 API URL
const getApiUrl = (req: NextApiRequest): string => {
  const host = req.headers.host;
  if (!host) {
    throw new Error('Host URL is not defined');
  }
  // 使用 HTTP 為本地開發環境
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return `http://${host}`;
  }
  // 使用 HTTPS 為生產環境
  return `https://${host}`;
};

// 根據 userID 獲取作者資料
const getAuthorData = async (userID: string, apiUrl: string): Promise<LawAuthorData | undefined> => {
  const res = await fetch(`${apiUrl}/api/getAuthorConfig`);
  if (!res.ok) {
    console.error('Error fetching author data:', res.statusText);
    throw new Error('Failed to fetch author data');
  }
  const authorData: LawAuthorData[] = await res.json() as LawAuthorData[];
  return authorData.find((author: LawAuthorData) => author.id === userID);
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

    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: 'Article/' });

    // 過濾掉無效的路徑
    const validFiles = files.filter((file: FileType) => file.name.split('/').length >= 3 && file.name.endsWith('.mdx'));

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
        const postAuthor = await getAuthorData(userID, apiUrl);

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
