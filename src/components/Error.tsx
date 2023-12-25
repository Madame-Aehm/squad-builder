import React from 'react'

type Props = {
  message: string | undefined
}

function Error({ message }: Props) {
  return (
    <div className='text-center mt-2'>
      <p>Something went wrong 🥺</p>
      <p>{ message }</p>
    </div>
  )
}

export default Error