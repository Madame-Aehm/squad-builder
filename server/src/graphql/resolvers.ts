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
import { starwarsRestApiBase } from '../utils/urls.js';

const resolvers = {
  Mutation: {
    signup: async(_, args: { email: string, password: string }) => {
      try {
        const hashPw = await encrypt(args.password);
        const newUser = await userModel.create({ email: args.email, password: hashPw });
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
      // shouldn't need to do this, but just in case
      try {
        return await fetchAll<Person_Type, Person>(`${starwarsRestApiBase}/api/people`, formatPerson, "allPeople", "person");
      } catch (error) {
        console.log(error);
      }
    },
    person: async(_, args: { id: string }) => {
      const found = cacheSearch("allPeople", args.id, "people");
      if (found) return found;
      // shouldn't need to do this, but just in case
      try {
        const result = await fetchSingle<Person_Type, Person>(`${starwarsRestApiBase}/api/people/${args.id}`, formatPerson);
        return result
      } catch (error) {
        console.log(error);
      }
    },
    allSpecies: async() => {
      const isCached = checkCache("allSpecies");
      if (isCached.cached) return isCached.result;
      // shouldn't need to do this, but just in case
      try {
        return await fetchAll<Species_Type, Species>(`${starwarsRestApiBase}/api/species`, formatSpecies, "allSpecies", "species");
      } catch(error) {
        console.log(error);
      }
    },
    species: async(_, args: { id: string }) => {
      const found = cacheSearch("allSpecies", args.id, "species");
      if (found) return found;
      // shouldn't need to do this, but just in case
      try {
        return await fetchSingle<Species_Type, Species>(`${starwarsRestApiBase}/api/species/${args.id}`, formatSpecies);
      } catch (error) {
        console.log(error);
      }
    }
  },
  Person: {
    species: async(parent: Person) => {
      if (parent.species.length !== 0) {
        const id = extractID(parent.species[0], "species/");
        const found = cacheSearch("allSpecies", id, "species");
        if (found) return found;
        // shouldn't need to do this, but just in case
        return await fetchSingle<Species_Type, Species>(parent.species[0], formatSpecies);
      }
      return null
    },
    homeworld: async(parent: Person) => {
      if (parent.homeworld) {
        const id = extractID(parent.homeworld, "planets/");
        const isCached = checkCache(`planet${id}`);
        if (isCached.cached) return isCached.result;
        return await fetchSingle<Planet_Type, Planet>(parent.homeworld, formatPlanet, "planet");
      }
      return null
    },
    starships: async(parent: Person) => {
      try {
        return await fetchArray<Starship_Type, Starship>(parent.starships, formatStarship, "starship");
      } catch (error) {
        console.log(error);
      }
    },
    vehicles: async(parent: Person) => {
      try {
        return await fetchArray<Vehicle_Type, Vehicle>(parent.vehicles, formatVehicle, "vehicle");
      } catch (error) {
        console.log(error);
      }
    }
  },
  Species: {
    homeworld: async(parent: Species) => {
      if (parent.homeworld) {
        const id = extractID(parent.homeworld, "planets/");
        const isCached = checkCache(`planet${id}`);
        if (isCached.cached) return isCached.result;
        return await fetchSingle<Planet_Type, Planet>(parent.homeworld, formatPlanet);
      }
      return null
    },
    people: async(parent: Species) => {
      const found = cacheSearch("allPeople", parent.people, "people");
      if (found) return found
      // shouldn't need to do this, but just in case
      try {
        const allPeople = await fetchAll(`${starwarsRestApiBase}/api/people`, formatPerson, "allPeople", "person");
        return allPeople.filter((item) => {
          let found = false;
          parent.people.forEach((url) => {
            if (item.id === extractID(url, "/people")) found = true
          });
          return found
        });
      } catch (error) {
        console.log(error)
      }
    }
  },
  Squad: {
    characters: async(parent: Squad) => {
      const found = cacheSearch("allPeople", parent.characters, "people");
      if (found) return found
      // shouldn't need to do this, but just in case
      try {
        const allPeople = await fetchAll(`${starwarsRestApiBase}/api/people`, formatPerson, "allPeople", "person");
        return allPeople.filter((item) => {
          let found = false;
          parent.characters.forEach((id) => {
            if (item.id === id) found = true
          });
          return found
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default resolvers