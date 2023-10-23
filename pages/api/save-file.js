// pages/api/save-file.js
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const filePath = '../backend/xpath_env.yaml';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await writeFile(filePath, req.body.content, 'utf8');
      res.status(200).json({ message: 'File saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file' });
      console.error(error);
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
