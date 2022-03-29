import nextConnect from 'next-connect'
import { middleware } from '@api-lib/middlewares'
import { findTopics, insertTopic } from '@api-lib/db/topic'
import { NextApiResponse } from 'next'
import { TNextApiRequest } from '@global/types'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.post(async (req: TNextApiRequest, res: NextApiResponse) => {
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

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const topics = await findTopics(req.db, +req.query.limit)

  res.json({ topics })
})

export default handler
