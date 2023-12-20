import { gql } from "@apollo/client";

export const ALL_PEOPLE = gql`
  query GetAllPeople {
    allPeople {
      id
      name
      image
      species {
        id
        name
      }
    }
  }`

export const GET_PERSON = gql`
  query getPerson ($id: ID!) {
    person (id: $id) {
      name
      id
    }
  }
`