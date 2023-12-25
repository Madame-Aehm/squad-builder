import React, { useContext, useState } from 'react'
import LogButton from './LogButton'
import Modal from './Modal'
import LoginSignup from './LoginSignup'
import { AuthContext } from '@/context/authContext'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const loginClickHandler = () => setShowLogin(true);

  return (
    <>
      <div className='bg-slate-200 min-h-screen flex flex-col p-2 max-w-[530px]'>
        <nav className='h-16 mb-2 p-2 flex items-center justify-end' style={{ border: "solid black 1px" }}>
          <LogButton clickHandler={loginClickHandler} title="LOGIN">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </LogButton>
        </nav>
        {children}
      </div>
      <LoginSignup showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  )
}

export default Layout