interface Person_Type {
  name: string
  height: string
  mass: string
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
  rotation_period: string
  orbital_period: string
  gravity: string
  population: string
  climate: string
  terrain: string
  surface_water: string
  residents: string[]
  url: string
}

interface Species_Type {
  name: string
  classification: string
  designation: string
  average_height: string
  average_lifespan: string
  eye_colors: string
  hair_colors: string
  skin_colors: string
  language: string
  homeworld: string | null
  people: string[]
  url: string
}

interface Starship_Type {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  url: string
}

interface Vehicle_Type {
  name: string
  model: string
  vehicle_class: string
  manufacturer: string
  cost_in_credits: string
  length: string
  crew: string
  passengers: string
  max_atmosphering_speed: string
  cargo_capacity: string
  consumables: string
  pilots: string[]
  url: string
}

interface People_Response {
  count: number
  next: string | null
  previous: string | null
  results: Person_Type[]
}