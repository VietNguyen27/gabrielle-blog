import { updatePost } from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { NextApiResponse } from 'next'
import { TNextApiRequest } from '@global/types'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.patch(async (req: TNextApiRequest, res: NextApiResponse) => {
  await updatePost(req.db, req.query.postId, {
    ...req.body,
  })

  return res.status(204).end()
})

export default handler
