import extractID from "./extractID.js";
import strToNum from "./strToNum.js";

export const formatPerson = (person: Person_Type): Person => {
  const formattedPerson: Person = { 
    ...person,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
    hairColor: person.hair_color,
    skinColor: person.skin_color,
    height: strToNum(person.height),
    mass: strToNum(person.mass),
    image: `${process.env.BASE_URL}/images/${person.name.toLowerCase().replaceAll(" ", "_").normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
    id: extractID(person.url, "people/")
  };
  return formattedPerson
} 

export const formatSpecies = (species: Species_Type): Species => {
  const formattedSpecies: Species = {
    ...species,
    averageHeight: strToNum(species.average_height),
    averageLifespan: strToNum(species.average_lifespan),
    hairColors: species.hair_colors.split(" "),
    eyeColors: species.eye_colors.split(" "),
    skinColors: species.skin_colors.split(" "),
    id: extractID(species.url, "species/")
  }
  return formattedSpecies
}

export const formatPlanet = (planet: Planet_Type): Planet => {
  const formattedPlanet: Planet = {
    ...planet,
    rotationPeriod: strToNum(planet.rotation_period),
    orbitalPeriod: strToNum(planet.orbital_period),
    surfaceWater: strToNum(planet.surface_water),
    population: strToNum(planet.population),
    id: extractID(planet.url, "planets/")
  }
  return formattedPlanet
}

export const formatStarship = (starship: Starship_Type): Starship => {
  const formattedStarship: Starship = {
    ...starship,
    starshipClass: starship.starship_class,
    costInCredits: strToNum(starship.cost_in_credits),
    maxAtmospheringSpeed: strToNum(starship.max_atmosphering_speed),
    hyperdriveRating: strToNum(starship.hyperdrive_rating),
    mglt: strToNum(starship.MGLT),
    cargoCapacity: strToNum(starship.cargo_capacity),
    length: strToNum(starship.length),
    id: extractID(starship.url, "starships/")
  }
  return formattedStarship
}

export const formatVehicle = (vehicle: Vehicle_Type): Vehicle => {
  const formattedVehicle: Vehicle = {
    ...vehicle,
    vehicleClass: vehicle.vehicle_class,
    costInCredits: strToNum(vehicle.cost_in_credits),
    maxAtmospheringSpeed: strToNum(vehicle.max_atmosphering_speed),
    cargoCapacity: strToNum(vehicle.cargo_capacity),
    length: strToNum(vehicle.length),
    id: extractID(vehicle.url, "vehicles/")
  }
  return formattedVehicle
}