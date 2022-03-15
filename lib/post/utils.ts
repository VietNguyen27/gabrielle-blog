import slug from 'slug'

export const slugPostTitle = (postTitle) => slug(postTitle, '-')
