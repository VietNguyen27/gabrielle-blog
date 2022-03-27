import { findPostById } from '@api-lib/db/post'
import { middleware } from '@api-lib/middlewares'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: any, res: any) => {
  const post = await findPostById(req.db, req.query.postId)

  return res.json({ post: { ...post } })
})

export default handler
