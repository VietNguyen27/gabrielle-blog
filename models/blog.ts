import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const blogSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
    slug: String,
    title: String,
    description: String,
    thumbnail: String,
    cover: String,
    content: String,
    readingTime: Number,
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    bookmarksCount: {
      type: Number,
      default: 0,
    },
    published: Boolean,
  },
  {
    timestamps: true,
  }
)

blogSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })
blogSchema.index({ createdAt: -1, user: -1 })

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

export default BlogModel
