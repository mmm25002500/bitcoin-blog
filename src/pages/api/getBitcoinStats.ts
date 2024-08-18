import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 使用 Blockchair API 取得比特幣統計資料
    const response = await axios.get('https://api.blockchair.com/bitcoin/stats');

    // 從響應中提取所需的資料
    const data = response.data?.data;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Bitcoin stats data not found' });
    }
  } catch (error) {
    console.error('Error fetching Bitcoin stats:', error);
    res.status(500).json({ error: 'Error fetching Bitcoin stats' });
  }
}
