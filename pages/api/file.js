import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { filename } = req.query;

    if (!filename) {
      res.status(400).json({ error: 'filename is required' });
      return;
    }

    try {
      const filePath = path.resolve('../backend', filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      res.status(200).json({ content: fileContent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    const { filename, content } = req.body;

    if (!filename || !content) {
      res.status(400).json({ error: 'filename and content are required' });
      return;
    }

    try {
      let user_filename = filename.substring(0, filename.lastIndexOf('.')) + '_USER_EDIT' + filename.substring(filename.lastIndexOf('.'));
      const filePath = path.resolve('../backend', user_filename);
      fs.writeFileSync(filePath, content, 'utf8');
      res.status(200).json({ message: 'File saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
