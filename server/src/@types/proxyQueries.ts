interface PERSON_type {
  id: string
  name: string
  birthYear: string
  eyeColor: string
  gender: string
  hairColor: string
  height: number | null
  mass: number | null
  skinColor: string
  homeworld: PLANET_type | null
  species: SPECIES_type | null
  image?: string
  starshipConnection: { starships: STARSHIP_type[] }
  starships?: STARSHIP_type[]
  vehicleConnection: {
    vehicles: VEHICLE_type[]
  }
  vehicles?: VEHICLE_type[]
}

interface PLANET_type {
  id: string
  name: string
  diameter: number | null
  rotationPeriod: number | null
  orbitalPeriod: number | null
  gravity: string
  population: number | null
  surfaceWater: number | null
}

interface SPECIES_type {
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
  homeworld: PLANET_type | null
}

interface STARSHIP_type {
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

interface VEHICLE_type {
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

export interface GETALLPEOPLE_RES {
  data: {
    allPeople: {
      people: PERSON_type[]
    }
  }
}

export interface GETPERSON_RES {
  data: {
    person: PERSON_type
  }
}

export interface GETALLSPECIES_RES {
  data: {
    allSpecies: {
      species: SPECIES_type[]
    }
  }
}

export interface GETSPECIES_RES {
  data: {
    species: SPECIES_type
  }
}
