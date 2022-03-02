import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema(
  {
    name: String,
    slug: String,
  },
  {
    timestamps: true,
  }
)

const TopicModel = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default TopicModel
