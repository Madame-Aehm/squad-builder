import 'dotenv/config'
import { formatPerson, formatPlanet, formatSpecies } from '../utils/formatTypes.js';
import fetchAll from '../utils/fetchAll.js';
import fetchSingle from '../utils/fetchSingle.js';
import checkCache from '../utils/checkCache.js';
import extractID from '../utils/extractID.js';

const resolvers = {
  Query: {
    allPeople: async() => {
      const isCached = checkCache("allPeople");
      if (isCached.cached) return isCached.result;
      try {
        return await fetchAll<Person_Type, Person>("https://swapi.dev/api/people", formatPerson, "allPeople", "person");
      } catch (error) {
        console.log(error);
      }
    },
    person: async(_, args: { id: string }) => {
      console.log(args);
      const isCached = checkCache(`person${args.id}`);
      if (isCached.cached) return isCached.result;
      try {
        return await fetchSingle<Person_Type, Person>(`https://swapi.dev/api/people/${args.id}`, formatPerson, "person", args.id);
      } catch (error) {
        console.log(error);
      }
    },
    allSpecies: async() => {
      const isCached = checkCache("allSpecies");
      if (isCached.cached) return isCached.result;
      try {
        return await fetchAll<Species_Type, Species>("https://swapi.dev/api/species", formatSpecies, "allSpecies", "species");
      } catch(error) {
        console.log(error);
      }
    },
    species: async(_, args: { id: string }) => {
      const isCached = checkCache(`species${args.id}`);
      if (isCached.cached) return isCached.result;
      try {
        return await fetchSingle<Species_Type, Species>(`https://swapi.dev/api/species/${args.id}`, formatSpecies, "species", args.id);
      } catch (error) {
        console.log(error);
      }
    }
  },
  Person: {
    species: async(parent: Person) => {
      console.log(parent);
      if (parent.species.length !== 0) {
        const id = extractID(parent.species[0], "species/");
        const isCached = checkCache(`species${id}`);
        if (isCached.cached) return isCached.result;
        return await fetchSingle<Species_Type, Species>(parent.species[0], formatSpecies, "species", id);
      }
      return null
    },
    homeworld: async(parent: Person) => {
      if (parent.homeworld) {
        const id = extractID(parent.homeworld, "planets/");
        const isCached = checkCache(`planet${id}`);
        if (isCached.cached) return isCached.result;
        return await fetchSingle<Planet_Type, Planet>(parent.homeworld, formatPlanet, "planet", id);
      }
      return null
    }
  }
}

export default resolvers