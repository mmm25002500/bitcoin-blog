import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author } = req.query;

  if (!author || typeof author !== 'string') {
    return res.status(400).json({ error: 'Invalid author parameter' });
  }

  const basePath = join(process.cwd(), 'src/Articals');
  const authorDir = join(basePath, author);

  try {
    const authorFiles = readdirSync(authorDir).filter(file => file.endsWith('.mdx'));
    const postCount = authorFiles.length;

    return res.status(200).json({ author, postCount });
  } catch (error) {
    return res.status(404).json({ error: 'Author not found or no posts available' });
  }
}
