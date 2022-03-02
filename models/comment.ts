import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
    },
    slug: String,
    content: String,
    depth: Number,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

commentSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })

const CommentModel =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default CommentModel
