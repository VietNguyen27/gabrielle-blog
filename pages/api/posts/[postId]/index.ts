import { findPostById } from '@api-lib/db/post'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const post = await findPostById(req.db, req.query.postId)

  return res.json({ post: { ...post } })
})

export default handler
