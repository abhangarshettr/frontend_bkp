// pages/api/headerFiles.js
import { promises as fs } from 'fs'
import path from 'path'
import { backendPath } from '../../utils/variables';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET methods allowed' });
  }

  const dirPath = path.join(process.cwd(), backendPath);
  const files = await fs.readdir(dirPath);
  const yamlAndTxtFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.txt'));
  
  return res.status(200).json(yamlAndTxtFiles);
}
