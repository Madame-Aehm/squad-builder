import extractID from "./extractID.js";

export const formatPerson = (person: Person_Type): Person => {
  const formattedPerson: Person = { 
    ...person,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
    hairColor: person.hair_color,
    skinColor: person.skin_color,
    image: `${process.env.BASE_URL}/images/${person.name.toLowerCase().replaceAll(" ", "_")}`,
    id: extractID(person.url, "people/")
  };
  return formattedPerson
} 

export const formatSpecies = (species: Species_Type): Species => {
  const formattedSpecies: Species = {
    ...species,
    averageHeight: species.average_height,
    averageLifespan: species.average_lifespan,
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
    rotationPeriod: planet.rotation_period,
    orbitalPeriod: planet.orbital_period,
    surfaceWater: planet.surface_water,
    id: extractID(planet.url, "planets/")
  }
  return formattedPlanet
}