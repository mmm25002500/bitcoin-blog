import { NextApiRequest, NextApiResponse } from 'next';
import { initAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author } = req.query;

  if (!author || typeof author !== 'string') {
    return res.status(400).json({ error: 'Invalid author parameter' });
  }

  try {
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: `Article/${author}/`, delimiter: '/' });

    const authorFiles = files.filter((file: { name: string }) => file.name.endsWith('.mdx'));
    const postCount = authorFiles.length;

    return res.status(200).json({ author, postCount });
  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    return res.status(404).json({ error: 'Author not found or no posts available' });
  }
}
