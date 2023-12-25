import { PersonSummary } from '@/@types'
import { SquadContext } from '@/context/squadContext'
import findDuplicateSpecies from '@/utils/findDuplicateSpecies'
import React, { useContext } from 'react'

type Props = {
  person: PersonSummary
  setInSquad: React.Dispatch<React.SetStateAction<boolean>>
}

const DuplicateSpecies = ({ person, setInSquad }: Props) => {
  const { squad } = useContext(SquadContext);
  const duplicateSpecies = findDuplicateSpecies(squad, person);
  return (
    <div>
      <p></p>
    </div>
  )
}

export default DuplicateSpecies