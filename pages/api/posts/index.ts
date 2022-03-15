import nextConnect from 'next-connect'
import { insertPost } from '@api-lib/db/post'
import { middleware, validate } from '@api-lib/middlewares'
import { postSchema } from '@api-lib/schemas'

const handler = nextConnect()

handler.use(middleware)

handler.post(
  validate(postSchema, async (req: any, res: any) => {
    if (!req.user) {
      return res.status(401).end()
    }

    const { cover, title, slug, content, topic, readingTime, published } =
      req.body

    await insertPost(req.db, {
      creatorId: req.user._id,
      cover,
      title,
      slug,
      content,
      topic,
      readingTime,
      published,
    })

    return res.json({ slug })
  })
)

export default handler
