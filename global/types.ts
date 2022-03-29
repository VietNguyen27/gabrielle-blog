import { NextApiRequest } from 'next'

export type TUser = {
  _id: string
  email: string
  username: string
  profilePicture: string
  backdrop: string
  bio: string
  position: string
  location: string
  createdAt: Date
}

export type TTopic = {
  _id: string
  value: string
  label: string
  color: string
  name: string
  description: string
  postsPublished: number
}

export type TNextApiRequest = NextApiRequest & {
  db: any
  logIn: any
  file: any
  session: any
  user: TUser
}
