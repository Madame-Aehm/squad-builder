import { PersonSummary } from '@/@types';
import { SquadContext } from '@/context/squadContext';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react'
import Modal from './Modal';
import useInSquad from '@/hooks/useInSquad';
import findDuplicateSpecies from '@/utils/findDuplicateSpecies';

type Props = {
  person: PersonSummary
}

function Buttons({ person }: Props) {
  const navigate = useRouter();
  const { squad, setSquad, removeFromSquad } = useContext(SquadContext);
  const { inSquad, setInSquad } = useInSquad(person);

  const [showModal, setShowModal] = useState(false);
  const message = useRef("");
  const duplicate = useRef<PersonSummary | null>(null)

  const handleAddToSquad = () => {
    if (squad.some((sm) => sm.id === person.id)) {
      message.current = "This person is already part of your Squad!";
      setShowModal(true);
      return
    }
    const duplicateSpecies = findDuplicateSpecies(squad, person);
    if (duplicateSpecies) {
      message.current = `Your Squad already has a ${duplicateSpecies.species!.name}. Would you like to replace ${duplicateSpecies.name}?`;
      duplicate.current = duplicateSpecies;
      setShowModal(true);
      return
    }
    if (squad.length >= 5) {
      message.current = "Your Squad is already at capacity! You'll have to remove somebody else first...";
      setShowModal(true);
      return
    } 
    setSquad([...squad, person]);
    console.log("Squad member added!");
  }

  const handleReplace = () => {
    const remove = squad.filter((sm) => sm.id !== duplicate.current?.id);
    setSquad([...remove, person]);
    setInSquad(true);
    duplicate.current = null;
    setShowModal(false);
  }

  const handleRemoveFromSquad = () => {
    removeFromSquad(person);
    setInSquad(false);
  }

  const buttonStyle = "bg-slate-500 hover:bg-slate-600 rounded-sm text-white"
  return (
    <>
      <div className="flex items-center gap-3">
        <button 
          className="bg-slate-500 hover:bg-slate-600 px-2 rounded-xl text-white"
          title={`Learn more about ${person.name}`}
          onClick={() => navigate.push(`/details/${person.id}`)}
          >
            ?
        </button>
        { !inSquad ? <button 
          className={buttonStyle}
          title={`Add ${person.name} to your Squad!`}
          onClick={handleAddToSquad}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          </button> : <button
            className={buttonStyle}
            title={`Remove ${person.name} from your Squad`}
            onClick={handleRemoveFromSquad}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
        }
      </div>
      <Modal state={showModal} setState={setShowModal} >
        <p>{message.current}</p>
        { !duplicate.current ? 
          <button className={`${buttonStyle} px-2 py-1 mt-1`} onClick={() => setShowModal(false)}>OK</button>
          : <>
            <button 
              className={`${buttonStyle} px-2 py-1 mt-1 mr-3`}
              onClick={handleReplace}
            >Yes</button>
            <button 
              className={`${buttonStyle} px-2 py-1 mt-1`}
              onClick={() => setShowModal(false)}
            >No</button>
          </>
         }
        
        {/* { !duplicate.current ? (
          <>
            <p>{message.current}</p>
            <button className={`${buttonStyle} px-2 py-1 mt-1`} onClick={() => setShowModal(false)}>OK</button>
          </>
        ) : (
          <>hello here I would put alternative</>
        ) } */}
      </Modal>
    </>
  )
}

export default Buttons