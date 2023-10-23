// pages/api/save-config.js

import fs from 'fs';
import { promisify } from 'util';
import yaml from 'js-yaml';
import { envFilePath } from '../../utils/variables';


function customLog(message) {
  fs.appendFileSync('server.log', `${new Date().toISOString()}: ${message}\n`);
}

const writeFile = promisify(fs.writeFile);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const yamlData = yaml.dump(req.body);
    customLog("thisis me");
    console.log(yamlData);
    try {
      await writeFile(envFilePath, yamlData, 'utf8'); 
      res.status(200).json({ message: 'Configuration saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving configuration' });
      console.error(error);
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}

