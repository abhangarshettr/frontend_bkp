// pages/api/htmlFileContent.js
import fs from 'fs';
import path from 'path';
import { backendPath } from '../../utils/variables';

export default function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    res.status(400).send({ error: 'No filename provided' });
    return;
  }

  const filePath = path.join(process.cwd(), backendPath, filename); 

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Unable to read file' });
    }

    res.status(200).send(data);
  });
}
