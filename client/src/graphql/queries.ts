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
  }
`

export const GET_PERSON = gql`
  query getPerson ($id: ID!) {
    person (id: $id) {
      name
      id
      species {
        id
      }
    }
  }
`

export const GET_ACTIVE_USER = gql`
  query getMe {
    me {
      id 
      email
    }
  }
`

export const GET_SQUADS = gql`
  query getSquads {
    squads {
      id
      name
      characters {
        id 
        name 
        species {
          id 
          name
        }
      }
    }
  }
`