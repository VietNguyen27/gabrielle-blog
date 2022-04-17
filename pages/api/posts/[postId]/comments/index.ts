import { findComments, insertComment, insertNotification } from '@api-lib/db'
import { middleware, validate } from '@api-lib/middlewares'
import { commentSchema } from '@api-lib/schemas/comment'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const rawComments = await findComments(req.db, req.query.postId)
  const comments = rawComments.map((comment) => {
    const likes = comment.likes.map((like) => String(like))
    return {
      ...comment,
      isLiked: req.user ? likes.includes(String(req.user._id)) : false,
    }
  })

  return res.json({ comments })
})

handler.post(
  validate(
    commentSchema,
    async (req: TNextApiRequest, res: NextApiResponse) => {
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

      const notification = {
        senderId: req.user._id,
        receiverId: req.body.userId,
        referenceId: parentId || req.query.postId,
      }

      if (depth > 0) {
        notification['type'] = 'comment'
        notification['title'] = 'replied to your comment'
        notification['message'] = rawComment
      } else {
        notification['type'] = 'post'
        notification['title'] = 'commented on your post'
        notification['message'] = rawComment
      }

      insertNotification(req.db, notification)

      return res.json({ comment })
    }
  )
)

export default handler
