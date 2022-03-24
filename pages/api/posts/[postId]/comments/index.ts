import { findComments, insertComment } from '@api-lib/db/comment'
import { middleware, validate } from '@api-lib/middlewares'
import { commentSchema } from '@api-lib/schemas/comment'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: any, res: any) => {
  const comments = await findComments(req.db, req.query.postId)

  return res.json({ comments })
})

handler.post(
  validate(commentSchema, async (req: any, res: any) => {
    if (!req.user) {
      return res.status(401).end()
    }

    const { comment: rawComment, parentId, depth } = req.body

    const comment = await insertComment(req.db, {
      creatorId: req.user._id,
      postId: req.query.postId,
      content: rawComment,
      ...(parentId && { parentId }),
      ...(depth && { depth }),
    })

    return res.json({ comment })
  })
)

export default handler
