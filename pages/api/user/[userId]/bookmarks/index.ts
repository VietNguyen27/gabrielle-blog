import { findBookmarksByUserId } from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const { userId, after } = req.query
  const bookmarks = await findBookmarksByUserId(
    req.db,
    userId,
    after ? after + '' : undefined
  )

  return res.json({ bookmarks })
})

export default handler
