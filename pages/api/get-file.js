// pages/api/get-file.js
import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const filePath = '../backend/xpath_env.yaml';

console.log(filePath)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const fileContent = await readFile(filePath, 'utf8');
      res.status(200).send(fileContent);
      console.log("file found")
    } catch (error) {
      res.status(500).json({ message: 'Error reading file' });
      console.error(error);
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
