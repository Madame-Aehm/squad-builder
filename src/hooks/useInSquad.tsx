import { PersonSummary } from '@/@types';
import { SquadContext } from '@/context/squadContext';
import { useContext, useEffect, useState } from 'react'

const useInSquad = (person: PersonSummary) => {
  const { squad } = useContext(SquadContext);
  const [inSquad, setInSquad] = useState(squad.some((sm) => person.id === sm.id));

  useEffect(() => {
    setInSquad(squad.some((sm) => person.id === sm.id));
  }, [squad])
  
  return { inSquad, setInSquad }
}

export default useInSquad