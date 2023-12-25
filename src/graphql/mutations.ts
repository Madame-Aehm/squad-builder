import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      user {
        id 
        email
      }
      token
    }
  }
`

export const SIGNUP = gql`
  mutation signup ($email: String!, $password: String!) {
    signup (email: $email, password:$password) {
      user {
        id 
        email
      }
      token
    }
  }
`