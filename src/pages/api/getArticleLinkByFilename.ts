import { NextApiRequest, NextApiResponse } from 'next';
import { initAdmin } from '../../../lib/firebaseAdmin'; // 確保路徑正確
import matter from 'gray-matter';
import fetch from 'node-fetch';
import { LawAuthorData } from '@/types/List/Author';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  // 檢查 filename 是否有效
  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  try {
    const apiUrl = getApiUrl(req);
    const app = await initAdmin();
    const bucket = app.storage().bucket();

    const [files] = await bucket.getFiles({ prefix: 'Article/' });

    // 遍歷文件，查找匹配的文件名
    for (const file of files) {
      if (file.name.endsWith(`${filename}.mdx`)) {
        const userID = file.name.split('/')[1];
        const fileContents = (await file.download())[0].toString('utf8');
        const { data } = matter(fileContents);
        const postAuthor = await getAuthorData(userID, apiUrl);

        // 返回文章數據和作者資料
        return res.status(200).json({
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
        });
      }
    }

    // 如果未找到文件，返回 404 錯誤
    return res.status(404).json({ error: 'Article not found' });
  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    return res.status(500).json({ error: 'Error accessing Firebase Storage' });
  }
}
