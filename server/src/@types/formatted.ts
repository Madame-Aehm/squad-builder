interface Person {
  id: string
  name: string
  birthYear: string
  eyeColor: string
  gender: string
  hairColor: string
  height: number | null
  mass: number | null
  skinColor: string
  homeworld: string
  species: string[]
  image: string
  starships: string[]
  vehicles: string[]
}

interface Planet {
  id: string
  name: string
  diameter: number | null
  rotationPeriod: number | null
  orbitalPeriod: number | null
  gravity: string
  population: number | null
  surfaceWater: number | null
}

interface Species {
  id: string
  name: string
  classification: string
  designation: string
  averageHeight: number | null
  averageLifespan: number | null
  eyeColors: string[]
  hairColors: string[]
  skinColors: string[]
  language: string
  homeworld: string | null
}

interface Starship {
  id: string
  name: string
  model: string
  starshipClass: string
  costInCredits: number | null
  length: number
  crew: string
  passengers: string
  maxAtmospheringSpeed: number | null
  hyperdriveRating: number | null
  cargoCapacity: number | null
  consumables: string
}

interface Vehicle {
  id: string
  name: string
  model: string
  vehicleClass: string
  costInCredits: number | null
  length: number | null
  crew: string
  passengers: string
  maxAtmospheringSpeed: number | null
  cargoCapacity: number | null
  consumables: string
}