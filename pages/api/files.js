import { promises as fs } from 'fs'
import path from 'path'
import tar from 'tar'
import yaml from 'js-yaml'
import { extractPath, envFilePath, nameoOfPkgFileInYaml, locationInPkg } from '../../utils/variables'


console.log("inside files api");
export default async function handler(req, res) {
  if (req.method === 'GET') {


    // Join currentDir with the relative path to your yaml file
    const yamlFile = await fs.readFile(envFilePath, 'utf8');
    const yamlContent = yaml.load(yamlFile);
    
    // Get .tgz file path from yaml content
    console.log(nameoOfPkgFileInYaml);
    const tgzFilePath = yamlContent[nameoOfPkgFileInYaml];

    // Extract .tgz file
    await tar.x({
      file: tgzFilePath,
      cwd: extractPath,
    });

    const directoryPath = path.join(extractPath, locationInPkg);
    const files = await fs.readdir(directoryPath);
    res.status(200).json(files);
  } else {
    res.status(405).json({ message: 'Only GET method is allowed' });
  }
}

