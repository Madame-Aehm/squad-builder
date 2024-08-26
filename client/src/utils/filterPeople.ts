import { PersonSummary } from "@/@types";
import { InputValues } from "@/@types/auth";

const filterPeople = (allPeople: PersonSummary[], inputValues: InputValues) => {
  const result = allPeople.filter((person) => {
    const speciesConfirm = !person.species && inputValues.speciesInput === "Unknown" || person.species?.name === inputValues.speciesInput;
    const nameConfirm = person.name.toLowerCase().includes(inputValues.nameInput.toLowerCase())
    if (inputValues.nameInput && inputValues.speciesInput) return speciesConfirm && nameConfirm;
    else if (inputValues.nameInput) return nameConfirm
    else if (inputValues.speciesInput) return speciesConfirm
  });
  return result
}

export default filterPeople