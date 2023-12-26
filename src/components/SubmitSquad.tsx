import { SquadContext } from '@/context/squadContext'
import React, { useContext, useState } from 'react'
import Modal from './Modal';
import { AuthContext } from '@/context/authContext';
import LoginSignup from './LoginSignup';
import SubmitSquadStep2 from './SubmitSquadStep2';


function SubmitSquad() {
  const { user } = useContext(AuthContext);
  const { squad } = useContext(SquadContext);

  const [showMessage, setShowMessage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSubmitSquad, setShowSubmitSquad] = useState(false);

  const difference = 3 - squad.length;
  let message = squad.length < 3 ? 
    `Your Squad still needs at least ${difference} more member${difference !== 1 ? "s" : ""}!`
    : "";

  const handleClick = () => {
    if (message) return setShowMessage(true);
    if (!user) return setShowLogin(true);
    setShowSubmitSquad(true)
  }
  return (
    <>
      <button 
        className="bg-slate-500 hover:bg-slate-600 p-2 rounded-xl text-white font-bold self-center"
        onClick={handleClick}>
          Submit your Squad!
      </button>
      <LoginSignup showLogin={showLogin} setShowLogin={setShowLogin} setShowSubmitSquad={setShowSubmitSquad} />
      <Modal state={showSubmitSquad} setState={setShowSubmitSquad}>
        <SubmitSquadStep2 close={() => setShowSubmitSquad(false)}/>
      </Modal>
      <Modal state={showMessage} setState={setShowMessage}>
        { message }
      </Modal>
    </>
  )
}

export default SubmitSquad