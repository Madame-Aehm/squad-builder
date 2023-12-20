import { PersonSummary } from '@/@types'
import React from 'react'

type Props = {
  person: PersonSummary
}

function PersonCard({person}: Props) {
  return (
    <div 
      className="flex gap-1 p-2 border-2 border-solid border-slate-900 rounded-md hover:shadow-lg"
      >
      <img 
        src={person.image} 
        alt={`Image of ${person.name}`} 
        className="w-20 rounded-md"
      />
        <div className="flex flex-col justify-center text-left">
          <p><b>{person.name}</b></p>
          <p>{person.species ? person.species.name : "???"}</p>
          <button className="flex justify-end items-center">
            <small>Add to Squad</small>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
    </div>
  )
}

export default PersonCard