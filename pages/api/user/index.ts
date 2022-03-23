import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { middleware, validate } from '@api-lib/middlewares'
import { extractUser } from '@lib/user'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { updateUserById } from '@api-lib/db'
import { updateUserSchema } from '@api-lib/schemas'

const upload = multer({ dest: '/tmp' })
const handler = nextConnect()

handler.use(middleware)
handler.get(async (req: NextApiRequest, res: NextApiResponse) =>
  res.json({ user: extractUser((req as any).user) })
)

handler.patch(
  upload.single('profilePicture'),
  validate(updateUserSchema, async (req, res) => {
    if (!req.user) {
      req.status(401).end()
      return
    }

    let profilePicture
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 120,
        height: 120,
        crop: 'fill',
      })
      profilePicture = image.secure_url
    }

    const user = await updateUserById(req.db, req.user._id, {
      ...req.body,
      ...(profilePicture && { profilePicture }),
    })

    res.json({ user: user.value })
  })
)

export const config = { api: { bodyParser: false } }

export default handler
