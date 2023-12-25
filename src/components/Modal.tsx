import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react'

interface Props extends PropsWithChildren {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
  title?: string
}
function Modal({ children, state, setState, title = "" }: Props) {
  return state && (
    <div 
      className='fixed top-0 left-0 h-screen w-screen flex justify-center items-start z-40 bg-slate-800 bg-opacity-80'>
      <div className='max-w-96 mt-24 bg-slate-100 p-3 mx-3 rounded-md border-2 border-slate-800'>
        <div className='flex justify-between items-center pb-2 border-b-2 border-slate-900 border-solid'>
          <h3 className="text-left text-xl font-bold">{title}</h3>
          <button className='text-slate-900' onClick={() => setState(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className='my-2 pb-2 border-b-2 border-slate-900 border-solid'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Modal