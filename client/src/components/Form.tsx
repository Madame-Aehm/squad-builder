import React, { FormEvent, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  errorMessage: string
  loading: boolean
  submit: string
}

const Form = ({ children, handleSubmit, errorMessage, loading, submit }: Props) => {
  return (
    <div className='w-60'>
      <form 
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2'>

          { children }
          <small className='text-red-600 text-center'>{ errorMessage }</small>
          { loading ? 
            <button className='p-2' disabled>Loading...</button> : 
            <button className='bg-slate-500 hover:bg-slate-600 p-2 rounded-xl text-white font-bold' type='submit'>{ submit }</button>
          }

      </form>
    </div>
  )
}

export default Form