import { PersonSummary } from '@/@types'
import Image from 'next/image'
import Buttons from './Buttons'

type Props = {
  squadMember: PersonSummary
  buttons?: boolean
}

const SquadMember = ({ squadMember }: Props) => {
  return (
    <div 
      key={squadMember.id}
      className="border-2 border-solid border-slate-800 py-2 px-1 rounded-md w-[5.8rem] h-36 flex flex-col items-center justify-between break-all">
        <div className='flex flex-col items-center'>
          <Image 
            src={squadMember.image} 
            alt={`Portrait of ${squadMember.name}`} 
            width={50}
            height={50}
            className="rounded-full"/>
          <p className='text-sm my-1 leading-tight'>{ squadMember.name }</p>
        </div>
      <Buttons person={squadMember} />
    </div>
  )
}

export default SquadMember