import { Types } from 'mongoose';

export interface MyContext {
  user: User | null
}

export interface User {
  _id: Types.ObjectId
  email: string
  password: string
}

export type AuthenticatedUser = {
  user: User
  token: string
}

export type Squad = {
  _id: Types.ObjectId
  name: string
  characters: string[]
  user: string
}