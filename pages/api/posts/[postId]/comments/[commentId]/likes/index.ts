import { likeComment, unlikeComment } from '@api-lib/db/comment'
import { middleware } from '@api-lib/middlewares'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.put(async (req: any, res: any) => {
  const comment = await likeComment(req.db, req.body.commentId, req.user._id)
  const isLiked = comment.likes.includes(String(req.user._id))

  return res.json({ comment: { ...comment, isLiked } })
})

handler.delete(async (req: any, res: any) => {
  const comment = await unlikeComment(req.db, req.body.commentId, req.user._id)

  return res.json({ comment: { ...comment, isLiked: false } })
})

export default handler
