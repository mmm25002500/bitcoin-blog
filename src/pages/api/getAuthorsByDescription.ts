import { NextApiRequest, NextApiResponse } from 'next';
import AuthorData from '@/config/Author.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.query;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing text parameter' });
  }

  const filteredAuthors = AuthorData.filter(author =>
    author.description.includes(text)
  );

  res.status(200).json(filteredAuthors);
}
