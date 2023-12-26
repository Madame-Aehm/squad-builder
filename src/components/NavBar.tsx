import { AuthContext } from '@/context/authContext';
import React, { useContext, useState } from 'react'
import LogButton from './LogButton';
import LoginSignup from './LoginSignup';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  
  const [showLogin, setShowLogin] = useState(false);
  const loginClickHandler = () => setShowLogin(true);
  return (
      <nav className='h-16 mb-2 p-2 flex items-center justify-end border-b-2 border-solid border-slate-800'>
        { !user ? 
          <LogButton clickHandler={loginClickHandler} title="LOGIN">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </LogButton>
        : <LogButton clickHandler={logout} title='LOGOUT'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </LogButton>
        }
        <LoginSignup showLogin={showLogin} setShowLogin={setShowLogin} />
      </nav>
  )
}

export default NavBar