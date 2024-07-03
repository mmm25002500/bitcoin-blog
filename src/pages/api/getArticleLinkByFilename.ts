import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import AuthorData from '@/config/Author.json';

// 根据 userID 获取作者资料
const getAuthorData = (userID: string) => {
  return AuthorData.find((author) => author.id === userID);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const basePath = join(process.cwd(), 'src/Articals');
  const authorDirs = readdirSync(basePath);

  for (const userID of authorDirs) {
    const userDir = join(basePath, userID);
    const userFiles = readdirSync(userDir);

    if (userFiles.includes(`${filename}.mdx`)) {
      const filePath = join(userDir, `${filename}.mdx`);
      const fileContents = readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const postAuthor = getAuthorData(userID);

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

  return res.status(404).json({ error: 'Article not found' });
}
