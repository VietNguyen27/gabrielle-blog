import mongoose, { Schema } from 'mongoose'
import timeZone from 'mongoose-timezone'

const notificationSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

notificationSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] })
notificationSchema.index({ createdAt: -1, receiver: -1 })

const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema)

export default NotificationModel
