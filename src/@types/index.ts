export interface AllPeopleFetchResult {
  allPeople: PersonSummary[]
}

export interface FullPersonFetchResult {
  person: Person | null
}

export interface PersonSummary {
  id: string
  image: string
  name: string
  species: SpeciesSummary | null
}

export interface SpeciesSummary {
  id: string
  name: string
}

export interface Person {
  id: string
  name: string
  birthYear: string
  eyeColor: string
  gender: string
  hairColor: string
  height: number
  mass: number
  skinColor: string
  homeworld: Planet | null
  species: Species | null
  image: string
  starships: [Starship]
  vehicles: [Vehicle]
}

export interface Planet {
  id: string
  name: string
  diameter: number
  rotationPeriod: number
  orbitalPeriod: number
  gravity: string
  population: number
  climate: string
  terrain: string
  surfaceWater: number
}

export interface Species {
  id: string
  name: string
  classification: string
  designation: string
  averageHeight: number
  averageLifespan: number
  eyeColors: [string]
  hairColors: [string]
  skinColors: [string]
  language: string
  homeworld: {
    name: string
  } | null
}

interface Starship {
  id: string
  name: string
  model: string
  starshipClass: string
  manufacturer: string
  costInCredits: number
  length: number
  crew: string
  passengers: string
  maxAtmospheringSpeed: number
  hyperdriveRating: number
  mglt: number
  image: string
  cargoCapacity: number
  consumables: string
}

interface Vehicle {
  id: string
  name: string
  model: string
  vehicleClass: string
  manufacturer: string
  costInCredits: number
  length: number
  crew: string
  passengers: string
  maxAtmospheringSpeed: number
  cargoCapacity: number
  consumables: string
}

export interface SavedSquad {
  id: string
  name: string
  characters: PersonSummary[]
}