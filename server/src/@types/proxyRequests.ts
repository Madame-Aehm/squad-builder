interface Person_Type {
  name: string
  height: number | null
  mass: number | null
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string | null
  species: string[]
  starships: string[]
  vehicles: string[]
  url: string
}

interface Planet_Type {
  name: string
  diameter: number
  rotation_period: number
  orbital_period: number
  gravity: string
  population: number
  surface_water: number
  url: string
}

interface Species_Type {
  name: string
  classification: string
  designation: string
  average_height: number | null
  average_lifespan: number | null
  eye_colors: string
  hair_colors: string
  skin_colors: string
  language: string
  homeworld: string | null
  url: string
}

interface Starship_Type {
  name: string
  model: string
  starship_class: string
  cost_in_credits: number | null
  length: number
  crew: string
  passengers: string
  max_atmosphering_speed: number | null
  hyperdriveRating: number | null
  cargo_capacity: number | null
  consumables: string
}

interface Vehicle_Type {
  id: string
  name: string
  model: string
  vehicle_class: string
  cost_in_credits: number | null
  length: number | null
  crew: string
  passengers: string
  max_atmosphering_speed: number | null
  cargo_capacity: number | null
  consumables: string
}

interface People_Response {
  count: number
  next: string | null
  previous: string | null
  results: Person_Type[]
}