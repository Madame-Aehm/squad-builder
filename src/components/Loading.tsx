import Image from 'next/image'
import React from 'react'



function Loading() {
  return (
    <div 
      className='fixed top-0 left-0 w-screen h-screen z-40 bg-gradient-to-bl from-slate-700 to-slate-900 flex justify-center items-center'>
      <Image 
        src='/solar-system-smaller.png' 
        alt='Loading screen of a rotating solar system icon'
        // className='h-20 w-20'
        width={50}
        height={50}
        priority
        style={{ animation: "spin 5s linear infinite" }}
      />
    </div>
  )
}

export default Loading