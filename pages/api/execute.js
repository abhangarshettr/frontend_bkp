// pages/api/execute.js

import { exec } from 'child_process'
import { command_header, createCommandWithHeader } from '../../utils/variables'


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' })
  }

  const { filename, headerFilename } = req.body


  // Construct the command
  let command = command_header.replace('FILENAME', filename);
  if (headerFilename) {
    command = createCommandWithHeader(filename, headerFilename);
  }


  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message)
      return res.status(500).json({ message: `error: ${error.message}` })
    }
    if (stderr) {
      console.log(stderr)
      return res.status(200).json({ message: `stderr: ${stderr}` })
    }
    console.log(stdout)
    res.status(200).json({ message: `stdout: ${stdout}` })
  })
}
