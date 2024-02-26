import React, { useContext, useState } from 'react'
import LogButton from './IconButton'
import Modal from './Modal'
import LoginSignup from './LoginSignup'
import { AuthContext } from '@/context/authContext'
import NavBar from './NavBar'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {


  return (
      <div className='bg-slate-200 min-h-screen flex flex-col p-2 max-w-[530px]'>
        <NavBar />
        {children}
      </div>
  )
}

export default Layout