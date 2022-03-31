import { followTopic, unfollowTopic } from '@api-lib/db/topic'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.put(async (req: TNextApiRequest, res: NextApiResponse) => {
  const topics = await followTopic(req.db, req.user._id, req.body.topic)

  return res.json({ topics })
})

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  const topics = await unfollowTopic(req.db, req.user._id, req.body.topic)

  return res.json({ topics })
})

export default handler
