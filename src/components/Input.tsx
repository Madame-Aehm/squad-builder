import React from 'react'

type Props = {
  value: string
  placeholder: string
  type: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  validation: boolean
  message: string
}

const Input = ({ value, placeholder, type, handleChange, validation, message }: Props) => {
  return (
    <>
      <input 
        value={value}
        className={`rounded-md p-2 ${ !validation ? "border-2 border-red-600" : "" }`}
        placeholder={placeholder} 
        type={type}
        onChange={(e) => handleChange(e)} />
      { !validation && <small className='text-red-600 -mt-2'>{ message }</small> }
    </>
  )
}

export default Input