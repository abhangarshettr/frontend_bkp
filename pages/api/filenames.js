import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { filenamesPath, rpcVarNameInYaml, datasetVarNameInYaml, headerVarNameInYaml } from '../../utils/variables';

export default async function handler(req, res) {
  const { editMode } = req.query;

  if (!editMode) {
    res.status(400).json({ error: 'editMode is required' });
    return;
  }

  try {
    const filePath = path.resolve(filenamesPath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContent);

    let filename;

    switch (editMode) {
      case 'header':
        filename = data[headerVarNameInYaml];
        break;
      case 'rpc':
        filename = data[rpcVarNameInYaml];
        break;
      case 'dataset':
        filename = data[datasetVarNameInYaml];
        break;
      default:
        res.status(400).json({ error: 'Invalid editMode' });
        return;
    }

    res.status(200).json({ filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
