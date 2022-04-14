import {
  followUser,
  unfollowUser,
  insertNotification,
  removeNotification,
} from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.put(async (req: TNextApiRequest, res: NextApiResponse) => {
  await followUser(req.db, req.user._id, req.body.followedId)

  const notification = {
    senderId: req.user._id,
    receiverId: req.body.followedId,
    referenceId: req.user._id,
    type: 'follower',
    title: ' is now followed to you.',
    message: '',
  }

  insertNotification(req.db, notification)

  return res.status(204).end()
})

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  await unfollowUser(req.db, req.user._id, req.body.followedId)

  removeNotification(req.db, {
    senderId: req.user._id,
    receiverId: req.body.followedId,
    referenceId: req.user._id,
  })

  return res.status(204).end()
})

export default handler
