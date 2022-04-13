import {
  findFollowersByUserId,
  findFollowersWithProfileByUserId,
} from '@api-lib/db'
import { middleware } from '@api-lib/middlewares'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const { userId, username_like, limit, skip, after } = req.query

  if (limit && skip) {
    const followers = await findFollowersWithProfileByUserId(
      req.db,
      userId,
      username_like,
      +limit,
      +skip
    )

    return res.json({ followers })
  } else {
    const followers = await findFollowersByUserId(
      req.db,
      userId,
      after ? after + '' : undefined
    )

    return res.json({ followers })
  }
})

export default handler
