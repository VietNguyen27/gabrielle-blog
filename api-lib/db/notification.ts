import { ObjectId } from 'mongodb'
import { dbProjectionCreators } from './post'

export async function findNotifications(
  db,
  userId,
  type,
  limit = 1000,
  skip = 0
) {
  const notifications = await db
    .collection('notifications')
    .aggregate([
      {
        $match: {
          receiverId: new ObjectId(userId),
          ...(type && { type }),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: '_id',
          as: 'sender',
        },
      },
      { $unwind: '$sender' },
      {
        $lookup: {
          from: 'posts',
          localField: 'referenceId',
          foreignField: '_id',
          as: 'reference',
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: dbProjectionCreators('sender.'),
      },
    ])
    .toArray()

  return notifications
}

export function insertNotification(db, body) {
  const { senderId, receiverId, referenceId } = body

  if (String(senderId) === String(receiverId)) return

  return db.collection('notifications').insertOne({
    ...body,
    senderId: new ObjectId(senderId),
    receiverId: new ObjectId(receiverId),
    referenceId: new ObjectId(referenceId),
    isRead: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export function removeNotification(db, body) {
  const { senderId, receiverId, referenceId } = body

  return db.collection('notifications').deleteOne({
    senderId: new ObjectId(senderId),
    receiverId: new ObjectId(receiverId),
    referenceId: new ObjectId(referenceId),
  })
}
