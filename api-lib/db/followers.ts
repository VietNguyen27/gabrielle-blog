import { ObjectId } from 'mongodb'
import { dbProjectionCreators } from './post'

export async function findFollowersByUserId(db, userId) {
  const followers = await db
    .collection('followers')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .toArray()

  return followers
}

export async function findFollowersWithProfileByUserId(
  db,
  userId,
  limit = 1000,
  skip = 0
) {
  const followers = await db
    .collection('followers')
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'followerId',
          foreignField: '_id',
          as: 'follower',
        },
      },
      { $unwind: '$follower' },
      {
        $project: dbProjectionCreators('follower.'),
      },
    ])
    .toArray()

  return followers
}
