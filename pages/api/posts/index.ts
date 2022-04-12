import nextConnect from 'next-connect'
import { findPosts, insertPost } from '@api-lib/db'
import { middleware, validate } from '@api-lib/middlewares'
import { postSchema } from '@api-lib/schemas'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { TNextApiRequest } from '@global/types'
import { NextApiResponse } from 'next'

const upload = multer({ dest: '/tmp' })
const handler = nextConnect<TNextApiRequest, NextApiResponse>()

handler.use(middleware)

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL)

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  })
}

handler.post(
  upload.single('cover'),
  validate(postSchema, async (req: TNextApiRequest, res: NextApiResponse) => {
    if (!req.user) {
      return res.status(401).end()
    }

    let cover
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 1000,
        height: 400,
        crop: 'fill',
      })
      cover = image.secure_url
    }

    const { title, content, topic, readingTime, published } = req.body

    const insertedId = await insertPost(req.db, {
      creatorId: req.user._id,
      title,
      content,
      topic: JSON.parse(topic),
      readingTime: Number(readingTime),
      published: published === 'true' ? true : false,
      ...(cover && { cover }),
    })

    return res.json({ insertedId })
  })
)

handler.get(async (req: TNextApiRequest, res: NextApiResponse) => {
  const { by, topic, title_like, not, limit, skip, random } = req.query

  const posts = await findPosts(
    req.db,
    by,
    topic,
    title_like ? title_like : undefined,
    not ? not : undefined,
    limit ? +limit : undefined,
    skip ? +skip : undefined,
    random ? !!random : undefined
  )

  res.json({ posts })
})

export const config = { api: { bodyParser: false } }

export default handler
