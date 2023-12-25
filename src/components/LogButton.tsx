import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title: string
  clickHandler: () => void
}

function LogButton({ children, title, clickHandler }: Props) {
  return (
    <button onClick={clickHandler} className='flex flex-col justify-center items-center'>
      { children }
      <small>{title}</small>
    </button>
  )
}

export default LogButton