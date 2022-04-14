import {
  likeComment,
  unlikeComment,
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
  const comment = await likeComment(req.db, req.body.commentId, req.user._id)
  const isLiked = comment.likes.includes(String(req.user._id))

  const notification = {
    senderId: req.user._id,
    receiverId: req.body.userId,
    referenceId: req.body.commentId,
    type: 'comment',
    title: ' liked a comment on ',
    message: '',
  }

  insertNotification(req.db, notification)

  return res.json({ comment: { ...comment, isLiked } })
})

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  const comment = await unlikeComment(req.db, req.body.commentId, req.user._id)

  removeNotification(req.db, {
    senderId: req.user._id,
    receiverId: req.body.userId,
    referenceId: req.body.commentId,
  })

  return res.json({ comment: { ...comment, isLiked: false } })
})

export default handler
