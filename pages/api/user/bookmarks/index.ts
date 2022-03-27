import { findBookmarksByUserId } from '@api-lib/db/bookmark'
import { middleware } from '@api-lib/middlewares'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: any, res: any) => {
  const rawBookmarks = await findBookmarksByUserId(req.db, req.user._id)
  const bookmarks = rawBookmarks.map(({ post }) => post)

  return res.json({ bookmarks })
})

export default handler
