import { findLikes, likePost, unlikePost } from '@api-lib/db/like'
import { middleware } from '@api-lib/middlewares'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: any, res: any) => {
  const rawLikes = await findLikes(req.db, req.query.postId)
  const likes = rawLikes.map((like) => String(like.userId))

  return res.json({ likes })
})

handler.put(async (req: any, res: any) => {
  const post = await likePost(req.db, req.body.postId, req.user._id)

  return res.json({ post: { ...post, isLiked: true } })
})

handler.delete(async (req: any, res: any) => {
  const post = await unlikePost(req.db, req.body.postId, req.user._id)

  return res.json({ post: { ...post, isLiked: false } })
})

export default handler
