import 'dotenv/config'
import { formatPerson, formatPlanet, formatSpecies, formatStarship, formatVehicle } from '../utils/formatTypes.js';
import fetchAll from '../utils/fetchFunctions/fetchAll.js';
import fetchSingle from '../utils/fetchFunctions/fetchSingle.js';
import checkCache from '../utils/checkCache.js';
import extractID from '../utils/extractID.js';
import fetchArray from '../utils/fetchFunctions/fetchArray.js';
import cacheSearch from '../utils/cacheSearch.js';
import userModel from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
import { encrypt, verify } from '../utils/bcrypt.js';
import { GraphQLError } from 'graphql';
import { Squad, User } from '../@types/auth.js';
import squadModel from '../models/squad.js';

const resolvers = {
  Mutation: {
    signup: async(_, args: { email: string, password: string }) => {
      try {
        const hashPw = await encrypt(args.password);
        const newUser = await userModel.create({ email: args.email, password: hashPw });
        console.log(newUser);
        const token = generateToken(newUser);
        return { user: { email: newUser.email, id: newUser._id }, token }
      } catch (error) {
        console.log(error);
        if (error.code === 11000) {
          throw new GraphQLError("Email already registered");
        }
      }
    },
    login: async(_, args: { email: string, password: string }) => {
      try {
        const user = await userModel.findOne({ email: args.email });
        if (!user) {
          throw new GraphQLError("Email not yet registered");
        }
        const verified = verify(args.password, user.password);
        if (!verified) {
          throw new GraphQLError("Password incorrect")
        }
        const token = generateToken(user);
        return { user: { email: user.email, id: user._id }, token }
      } catch (error) {
        console.log(error);
      }
    },
    createSquad: async(_, args: { name: string, characters: string[] }, contextValue: { user: User | null }) => {
      if (!contextValue.user) {
        throw new GraphQLError("You must be logged in");
      }
      try {
        return await squadModel.create({ ...args, user: contextValue.user._id });
      } catch (error) {
        console.log(error);
      }
    }
  },
  Query: {
    me: async(_, __, contextValue: { user: User | null }) => {
      return contextValue.user
    },
    squads: async(_, __, contextValue: { user: User | null }) => {
      if (!contextValue.user) {
        throw new GraphQLError("You must be logged in");
      }
      try {
        return await squadModel.find({ user: contextValue.user._id });
      } catch (error) {
        console.log(error);
      }
    },
    squad: async(_, args: { id: string }, contextValue: { user: User | null }) => {
      if (!contextValue.user) {
        throw new GraphQLError("You must be logged in");
      }
      return await squadModel.findOne({ user: contextValue.user._id, _id: args.id });
    },
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
      const found = cacheSearch("allPeople", args.id, "people");
      if (found) return found;
      try {
        // swap this for fetch all and filter single person out for deploy
        return await fetchSingle<Person_Type, Person>(`https://swapi.dev/api/people/${args.id}`, formatPerson);
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
      const found = cacheSearch("allSpecies", args.id, "species");
      if (found) return found;
      try {
        // swap this for fetch all and filter single species out for deploy
        return await fetchSingle<Species_Type, Species>(`https://swapi.dev/api/species/${args.id}`, formatSpecies);
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
        const found = cacheSearch("allSpecies", id, "species");
        if (found) return found;
        // swap this for fetch all and filter single species out for deploy
        return await fetchSingle<Species_Type, Species>(parent.species[0], formatSpecies);
      }
      return null
    },
    homeworld: async(parent: Person) => {
      if (parent.homeworld) {
        const id = extractID(parent.homeworld, "planets/");
        const found = cacheSearch("allPlanets", id, "planets");
        if (found) return found;
        // swap this for fetch all and filter single planet out for deploy
        return await fetchSingle<Planet_Type, Planet>(parent.homeworld, formatPlanet);
      }
      return null
    },
    starships: async(parent: Person) => {
      const found = cacheSearch("allStarships", parent.starships, "starships");
      if (found) return found
      try {
        // swap this for fetch all and filter single starships out for deploy
        return await fetchArray<Starship_Type, Starship>(parent.starships, formatStarship);
      } catch (error) {
        console.log(error);
      }
    },
    vehicles: async(parent: Person) => {
      const found = cacheSearch("allVehicles", parent.vehicles, "vehicles");
      if (found) return found
      try {
        // swap this for fetch all and filter single vehicle out for deploy
        return await fetchArray<Vehicle_Type, Vehicle>(parent.vehicles, formatVehicle);
      } catch (error) {
        console.log(error);
      }
    }
  },
  Species: {
    homeworld: async(parent: Species) => {
      if (parent.homeworld) {
        const id = extractID(parent.homeworld, "planets/");
        const found = cacheSearch("allPlanets", id, "planets");
        if (found) return found;
        // swap this for fetch all and filter single planet out for deploy
        return await fetchSingle<Planet_Type, Planet>(parent.homeworld, formatPlanet);
      }
      return null
    },
    people: async(parent: Species) => {
      const found = cacheSearch("allPeople", parent.people, "people");
      if (found) return found
      // swap this for fetch all and filter single person out for deploy
      return await fetchArray<Person_Type, Person>(parent.people, formatPerson);
    }
  },
  Squad: {
    characters: async(parent: Squad) => {
      const found = cacheSearch("allPeople", parent.characters, "people");
      if (found) return found
      const urls = parent.characters.map((id) => `https://swapi.dev/api/people/${id}`);
      return await fetchArray<Person_Type, Person>(urls, formatPerson);
    }
  }
}

export default resolvers