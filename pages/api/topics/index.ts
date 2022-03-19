import nextConnect from 'next-connect'
import { middleware } from '@api-lib/middlewares'
import { findTopics, insertTopic } from '@api-lib/db/topic'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: any, res: any) => {
  const { label, value, name, description = '', color } = req.body

  const insertedId = await insertTopic(req.db, {
    label,
    value,
    name,
    description,
    color,
  })

  return res.json({ insertedId })
})

handler.get(async (req: any, res: any) => {
  const topics = await findTopics(req.db, req.query.limit)

  res.json({ topics })
})

export default handler
