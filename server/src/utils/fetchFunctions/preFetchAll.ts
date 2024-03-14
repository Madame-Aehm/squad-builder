import { formatPerson, formatSpecies } from "../formatTypes.js";
import { starwarsRestApiBase } from "../urls.js";
import fetchAll from "./fetchAll.js";

export const preFetch = async() => {
  try {
    await fetchAll<Person_Type, Person>(`${starwarsRestApiBase}/api/people`, formatPerson, "allPeople", "person");
    await fetchAll<Species_Type, Species>(`${starwarsRestApiBase}/api/species`, formatSpecies, "allSpecies", "species");
  } catch (error) {
    console.log(error);
  }
}