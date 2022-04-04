import { ObjectId } from 'mongodb'

export async function followUser(db, userId, followedId) {
  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(followedId) },
      { $inc: { followersCount: 1 } }
    )

  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $inc: { followingCount: 1 } }
    )

  await db.collection('followers').insertOne({
    userId: new ObjectId(followedId),
    followerId: new ObjectId(userId),
  })

  await db.collection('following').insertOne({
    userId: new ObjectId(userId),
    followingId: new ObjectId(followedId),
  })
}

export async function unfollowUser(db, userId, followedId) {
  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(followedId) },
      { $inc: { followersCount: -1 } }
    )

  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $inc: { followingCount: -1 } }
    )

  await db.collection('followers').deleteOne({
    userId: new ObjectId(followedId),
    followerId: new ObjectId(userId),
  })

  await db.collection('following').deleteOne({
    userId: new ObjectId(userId),
    followingId: new ObjectId(followedId),
  })
}
