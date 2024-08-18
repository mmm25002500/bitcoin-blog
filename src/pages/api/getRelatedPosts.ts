import { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { PostProps } from '@/types/List/PostData';
import { initAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag, exclude, mode } = req.query;

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: '缺少或無效的 tag 參數' });
  }

  const tagsArray: string[] = JSON.parse(tag);
  const app = await initAdmin();
  const bucket = app.storage().bucket();

  try {
    const [files] = await bucket.getFiles({ prefix: 'Article/' });

    const filteredFiles = files.filter(file => {
      const parts = file.name.split('/');
      if (parts.length < 3 || !parts[2].endsWith('.mdx')) {
        return false;
      }
      const userID = parts[1];
      const filenameWithExt = parts[2];
      const filename = filenameWithExt.replace('.mdx', '');
      return `${userID}/${filename}` !== exclude;
    });

    // 限制最多只能取 100 筆資料
    const limitedFiles = filteredFiles.slice(0, 100);

    const promises = limitedFiles.map(async file => {
      const fileContentsArray = await file.download();
      const fileContents = fileContentsArray[0].toString('utf8');
      const { data } = matter(fileContents);
      const userID = file.name.split('/')[1];
      const filename = file.name.split('/')[2].replace('.mdx', '');

      return {
        ...data,
        id: filename,
        authorData: { id: userID }
      } as PostProps;
    });

    const relatedPosts = await Promise.all(promises);

    const filteredPosts = relatedPosts.filter(post => {
      const hasAllTags = tagsArray.every(tag => post.tags.includes(tag));
      const hasAnyTag = tagsArray.some(tag => post.tags.includes(tag));
      return (mode === 'all' && hasAllTags) || (mode !== 'all' && hasAnyTag);
    });

    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    res.status(500).json({ error: 'Error accessing Firebase Storage' });
  }
}
