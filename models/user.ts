import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: String,
    bio: String,
    backdrop: String,
    skills: [String],
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followersCount: {
      type: Number,
      default: 0,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    reportReceived: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
