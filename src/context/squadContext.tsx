import { PersonSummary } from "@/@types";
import findDuplicateSpecies from "@/utils/findDuplicateSpecies";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

interface SquadContext {
  squad: PersonSummary[]
  setSquad: Dispatch<SetStateAction<PersonSummary[]>>
  removeFromSquad: (person: PersonSummary) => void
}

const SquadContext = createContext<SquadContext>({} as SquadContext);

const SquadContextProvider = ({ children }: PropsWithChildren) => {
  
  const [squad, setSquad] = useState<PersonSummary[]>([]);
  console.log("squad", squad);

  const removeFromSquad = (person: PersonSummary) => {
    setSquad(squad.filter((sm) => sm.id !== person.id));
    console.log("Squad member removed.")
  }
  
  return (
    <SquadContext.Provider value={{ squad, setSquad, removeFromSquad }}>
      { children }
    </SquadContext.Provider>)
}

export { SquadContext, SquadContextProvider }
