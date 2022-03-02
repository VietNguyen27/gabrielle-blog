import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const feedbackSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    motive: String,
    message: String,
    slug: String,
    status: Boolean,
  },
  {
    timestamps: true,
  }
)

feedbackSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })

const FeedbackModel =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema)

export default FeedbackModel
