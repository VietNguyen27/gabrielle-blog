import { likePost, unlikePost } from '@api-lib/db/post'
import { middleware } from '@api-lib/middlewares'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.put(async (req: any, res: any) => {
  const post = await likePost(req.db, req.body.postId, req.user._id)
  const isLiked = post.likes.includes(String(req.user._id))

  return res.json({ post: { ...post, isLiked } })
})

handler.delete(async (req: any, res: any) => {
  const post = await unlikePost(req.db, req.body.postId, req.user._id)

  return res.json({ post: { ...post, isLiked: false } })
})

export default handler
