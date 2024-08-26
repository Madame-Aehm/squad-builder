import { PersonSummary } from '@/@types'
import Image from 'next/image'
import React from 'react'
import Buttons from './Buttons'

type Props = {
  person: PersonSummary
}

function PersonListItem({ person }: Props) {
  return (
    <div 
      key={person.id}
      className="p-2 flex justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={person.image} 
          alt={`Image of ${person.name}`}
          width={45}
          height={45}
          className="rounded-lg" />
        <b className='text-left'>{person.name}</b>
      </div>
      <Buttons person={person} />
    </div>
  )
}

export default PersonListItem