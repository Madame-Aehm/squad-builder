import 'dotenv/config'
import proxyFetch from "../utils/fetchFunctions/proxyFetch.js";
import { GETALLPEOPLE_RES, GETALLSPECIES_RES, GETPERSON_RES, GETSPECIES_RES } from "../@types/proxyQueries.js";
import { GETALLPEOPLE, GETALLSPECIES, GETPERSON, GETSPECIES } from "./proxyQueries.js";


const resolvers = {
  Query: {
    allPeople: async () => {
      try {
        const result = await proxyFetch<GETALLPEOPLE_RES>(GETALLPEOPLE);
        const formatResult = result.data.allPeople.people.map((p) => {
          p.starships = p.starshipConnection.starships
          p.vehicles = p.vehicleConnection.vehicles
          p.image = `${process.env.BASE_URL}/images/${p.name.toLowerCase().replaceAll(" ", "_")}`;
          return p
        })
        return formatResult;
      } catch (error) {
        console.log(error);
      }
    },
    person: async (_, args: { id: string }) => {
      try {
        const result = await proxyFetch<GETPERSON_RES>(GETPERSON(args.id))
        return result.data.person
      } catch (error) {
        console.log(error);
      }
    },
    allSpecies: async () => {
      try {
        const result = await proxyFetch<GETALLSPECIES_RES>(GETALLSPECIES);
        return result.data.allSpecies.species;
      } catch (error) {
        console.log(error);
      }
    },
    species: async (_, args: { id: string }) => {
      try {
        const result = await proxyFetch<GETSPECIES_RES>(GETSPECIES(args.id))
        return result.data.species;
      } catch (error) {
        console.log(error);
      }
    }
  },
};

export default resolvers