export async function insertPost(
  db,
  { creatorId, content, topic, slug, title, cover, readingTime, published }
) {
  const post = {
    creatorId,
    content,
    topic,
    slug,
    title,
    cover,
    readingTime,
    likes: [],
    likesCount: 0,
    comments: [],
    commentsCount: 0,
    bookmarks: [],
    bookmarksCount: 0,
    published,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const { insertedId } = await db.collection('posts').insertOne(post)

  return insertedId
}
