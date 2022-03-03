import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const topicSchema = new Schema(
  {
    name: String,
    slug: String,
  },
  {
    timestamps: true,
  }
)

topicSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })
topicSchema.index({ createdAt: -1 })

const TopicModel = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default TopicModel
