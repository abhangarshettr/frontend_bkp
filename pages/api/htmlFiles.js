// pages/api/htmlFiles.js
import fs from 'fs';
import path from 'path';
import { backendPath } from '../../utils/variables';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), backendPath); // Adjust this path according to your project
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send({ error: 'Unable to scan directory' });
    }

    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');
    res.status(200).json(htmlFiles);
  });
}
