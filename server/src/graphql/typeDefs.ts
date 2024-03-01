const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    me: User
    person(id: ID!): Person
    allPeople: [Person]
    species(id: ID!): Species
    allSpecies: [Species]
  }
  type Mutation {
    signup(email: String!, password: String!): AuthenticatedUser
    login(email: String!, password: String!): AuthenticatedUser
    createSquad(name: String!, characters: [ID!]!): Squad
  }
  type User {
    id: ID!
    email: String
  }
  type AuthenticatedUser {
    user: User
    token: String
  }
  type Squad {
    id: ID!
    name: String
    characters: [Person]
  }

  type Person {
    id: ID!
    name: String
    birthYear: String
    eyeColor: String
    gender: String
    hairColor: String
    height: Int
    mass: Float
    skinColor: String
    homeworld: Planet
    species: Species
    image: String
    starships: [Starship]
    vehicles: [Vehicle]
  }
  type Planet {
    id: ID!
    name: String
    diameter: Int
    rotationPeriod: Int
    orbitalPeriod: Int
    gravity: String
    population: Int
    climate: String
    terrain: String
    surfaceWater: Float
    residents: [Person]
  }
  type Species {
    id: ID!
    name: String
    classification: String
    designation: String
    averageHeight: Float
    averageLifespan: Int
    eyeColors: [String]
    hairColors: [String]
    skinColors: [String]
    language: String
    homeworld: Planet
    people: [Person]
  }
  type Starship {
    id: ID!
    name: String
    model: String
    starshipClass: String
    manufacturer: String
    costInCredits: Float
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    hyperdriveRating: Float
    mglt: Int
    cargoCapacity: Float
    consumables: String
    pilots: [Person]
  }
  type Vehicle {
    id: ID!
    name: String
    model: String
    vehicleClass: String
    manufacturer: String
    costInCredits: Int
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    cargoCapacity: Int
    consumables: String
    pilots: [Person]
  }
`;

export default typeDefs