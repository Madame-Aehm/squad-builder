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
  climate: string
  terrain: string
  surfaceWater: number | null
  residents: string[]
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
  people: string[]
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
  mglt: number
  cargoCapacity: number | null
  consumables: string
  pilots: string[]
}

interface Vehicle {
  id: string
  name: string
  model: string
  vehicleClass: string
  manufacturer: string
  costInCredits: number | null
  length: number | null
  crew: string
  passengers: string
  maxAtmospheringSpeed: number | null
  cargoCapacity: number | null
  consumables: string
  pilots: string[]
}