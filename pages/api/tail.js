// /api/tail.js
import { Tail } from 'tail'
import SSE from 'express-sse'

const sse = new SSE()

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method is allowed' })
  }

  let { filename } = req.query
  filename = filename.replace('.yang', '.log');

  const tail = new Tail(`../backend/${filename}`)

  tail.on('line', (data) => {
    sse.send(data)
  })

  tail.on('error', (error) => {
    console.log('ERROR: ', error)
  })

  sse.init(req, res)
}
