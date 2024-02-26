export interface User {
  email: string
  id: string
}

export interface AuthUser {
  user: User
  token: string
}

export interface InputValues {
  nameInput: string,
  speciesInput: string
}