import {
  findBookmarksByPostId,
  savePost,
  unsavePost,
} from '@api-lib/db/bookmark'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const rawBookmarks = await findBookmarksByPostId(req.db, req.query.postId)
  const bookmarks = rawBookmarks.map((like) => String(like.userId))

  return res.json({ bookmarks })
})

handler.put(async (req: TNextApiRequest, res: NextApiResponse) => {
  const post = await savePost(req.db, req.body.postId, req.user._id)

  return res.json({ post: { ...post, isBookmarked: true } })
})

handler.delete(async (req: TNextApiRequest, res: NextApiResponse) => {
  const post = await unsavePost(req.db, req.body.postId, req.user._id)

  return res.json({ post: { ...post, isBookmarked: false } })
})

export default handler
