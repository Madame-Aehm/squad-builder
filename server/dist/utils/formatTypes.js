import extractID from "./extractID.js";
import strToNum from "./strToNum.js";
export const formatPerson = (person) => {
    const formattedPerson = {
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
    return formattedPerson;
};
export const formatSpecies = (species) => {
    const formattedSpecies = {
        ...species,
        averageHeight: strToNum(species.average_height),
        averageLifespan: strToNum(species.average_lifespan),
        hairColors: species.hair_colors.split(" "),
        eyeColors: species.eye_colors.split(" "),
        skinColors: species.skin_colors.split(" "),
        id: extractID(species.url, "species/")
    };
    return formattedSpecies;
};
export const formatPlanet = (planet) => {
    const formattedPlanet = {
        ...planet,
        rotationPeriod: strToNum(planet.rotation_period),
        orbitalPeriod: strToNum(planet.orbital_period),
        surfaceWater: strToNum(planet.surface_water),
        population: strToNum(planet.population),
        id: extractID(planet.url, "planets/")
    };
    return formattedPlanet;
};
export const formatStarship = (starship) => {
    const formattedStarship = {
        ...starship,
        starshipClass: starship.starship_class,
        costInCredits: strToNum(starship.cost_in_credits),
        maxAtmospheringSpeed: strToNum(starship.max_atmosphering_speed),
        hyperdriveRating: strToNum(starship.hyperdrive_rating),
        mglt: strToNum(starship.MGLT),
        cargoCapacity: strToNum(starship.cargo_capacity),
        length: strToNum(starship.length),
        id: extractID(starship.url, "starships/")
    };
    return formattedStarship;
};
export const formatVehicle = (vehicle) => {
    const formattedVehicle = {
        ...vehicle,
        vehicleClass: vehicle.vehicle_class,
        costInCredits: strToNum(vehicle.cost_in_credits),
        maxAtmospheringSpeed: strToNum(vehicle.max_atmosphering_speed),
        cargoCapacity: strToNum(vehicle.cargo_capacity),
        length: strToNum(vehicle.length),
        id: extractID(vehicle.url, "vehicles/")
    };
    return formattedVehicle;
};
//# sourceMappingURL=formatTypes.js.map