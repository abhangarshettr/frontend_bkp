import { exec } from 'child_process'
import { create } from 'domain'
import { createTestCommand } from '../../utils/variables'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' })
  }

  const { filename, useDataSet, selectedDataSet, useRPCMapping, selectedRPCMapping, executeAllPaths } = req.body

  const command = createTestCommand(filename, useDataSet, selectedDataSet, useRPCMapping, selectedRPCMapping, executeAllPaths) + ` >> ../backend/${filename.replace('.yang', '.log')} 2>&1`


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