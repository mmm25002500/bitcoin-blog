import { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';
import { initAdmin } from '../../../lib/firebaseAdmin'; // 確保路徑正確

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag, exclude, mode } = req.query;

  // 檢查 tag 參數是否有效
  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: '缺少或無效的 tag 參數' });
  }

  const tagsArray: string[] = JSON.parse(tag);
  const app = await initAdmin();
  const bucket = app.storage().bucket();

  try {
    // 獲取所有文章文件
    const [files] = await bucket.getFiles({ prefix: 'Article/' });

    let relatedPosts: PostProps[] = [];

    // 遍歷每個文章文件
    for (const file of files) {
      const parts = file.name.split('/');
      // 過濾掉無效的文件路徑
      if (parts.length < 3 || !parts[2].endsWith('.mdx')) {
        continue;
      }
      const userID = parts[1];
      const filenameWithExt = parts[2];
      const filename = filenameWithExt.replace('.mdx', '');

      // 過濾掉被排除的文章
      if (`${userID}/${filename}` === exclude) {
        continue;
      }

      // 下載文章文件內容
      const fileContentsArray = await file.download();
      const fileContents = fileContentsArray[0].toString('utf8');
      // 使用 gray-matter 解析文章內容中的元數據
      const { data } = matter(fileContents);

      // 如果標籤數組不為空，則根據標籤篩選文章
      if (tagsArray.length > 0) {
        const hasAllTags = tagsArray.every((tag) => data.tags.includes(tag));
        const hasAnyTag = tagsArray.some((tag) => data.tags.includes(tag));

        if ((mode === 'all' && hasAllTags) || (mode !== 'all' && hasAnyTag)) {
          relatedPosts.push({
            ...data,
            id: filename,
            authorData: { id: userID }
          } as PostProps);
        }
      } else {
        relatedPosts.push({
          ...data,
          id: filename,
          authorData: { id: userID }
        } as PostProps);
      }
    }

    // 返回相關文章的 JSON 響應
    res.status(200).json(relatedPosts);
  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    res.status(500).json({ error: 'Error accessing Firebase Storage' });
  }
}
