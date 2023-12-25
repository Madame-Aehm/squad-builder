import { PersonSummary } from "@/@types";

const findDuplicateSpecies = (squad: PersonSummary[], person: PersonSummary) => {
  return squad.filter((sm) => {
    if (sm.species) {
      if (person.species) {
        return person.species.name === sm.species.name ? true : false
      } else return false;
    } else return false;
  })[0]
}

export default findDuplicateSpecies