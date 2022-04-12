import {
  findFollowingByUserId,
  findFollowingWithProfileByUserId,
} from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const { userId, username_like, limit, skip } = req.query

  if (limit && skip) {
    const following = await findFollowingWithProfileByUserId(
      req.db,
      userId,
      username_like,
      +limit,
      +skip
    )

    return res.json({ following })
  } else {
    const following = await findFollowingByUserId(req.db, userId)

    return res.json({ following })
  }
})

export default handler
