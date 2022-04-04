import { followUser, unfollowUser } from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.put(async (req: TNextApiRequest, res: NextApiResponse) => {
  await followUser(req.db, req.user._id, req.body.followedId)

  return res.status(204).end()
})

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  await unfollowUser(req.db, req.user._id, req.body.followedId)

  return res.status(204).end()
})

export default handler
