import React from 'react'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className='container bg-slate-200 min-h-screen p-4'>
      {children}
    </div>
  )
}

export default Layout