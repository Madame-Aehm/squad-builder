import { formatPerson, formatSpecies } from "../formatTypes.js";
import { starwarsRestApiBase } from "../urls.js";
import fetchAll from "./fetchAll.js";
export const preFetch = async () => {
    try {
        await fetchAll(`${starwarsRestApiBase}/api/people`, formatPerson, "allPeople", "person");
        await fetchAll(`${starwarsRestApiBase}/api/species`, formatSpecies, "allSpecies", "species");
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=preFetchAll.js.map