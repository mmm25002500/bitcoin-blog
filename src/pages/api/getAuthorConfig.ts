import type { NextApiRequest, NextApiResponse } from 'next';
import { initAdmin } from '../../../lib/firebaseAdmin'; // 确保路径正确

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const file = bucket.file('config/Author.json');

    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileContents = await file.download();
    const data = fileContents[0].toString('utf8');

    try {
      const jsonData = JSON.parse(data);
      return res.status(200).json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return res.status(500).json({ error: 'Error parsing JSON data' });
    }

  } catch (error) {
    console.error('Error accessing Firebase Storage:', error);
    return res.status(500).json({ error: 'Error accessing Firebase Storage' });
  }
}
