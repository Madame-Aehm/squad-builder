const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
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
    surfaceWater: Float
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
  }
  type Starship {
    id: ID!
    name: String
    model: String
    starshipClass: String
    costInCredits: Float
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    hyperdriveRating: Float
    cargoCapacity: Float
    consumables: String
  }
  type Vehicle {
    id: ID!
    name: String
    model: String
    vehicleClass: String
    costInCredits: Int
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    cargoCapacity: Int
    consumables: String
  }
  type Query {
    person(id: ID!): Person
    allPeople: [Person]
    species(id: ID!): Species
    allSpecies: [Species]
  }
`;

export default typeDefs