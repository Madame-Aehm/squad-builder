import React, { useContext, useEffect, useState } from 'react'
import Input from './Input'
import Form from './Form'
import { SquadContext } from '@/context/squadContext'
import validateSquadName from '@/utils/validateSquadName'
import { useMutation } from '@apollo/client'
import { CREATE_SQUAD } from '@/graphql/mutations'
import { SavedSquad } from '@/@types'

type Result = {
  createSquad: SavedSquad
}

type Props = {
  close: () => void
}

const SubmitSquadStep2 = ({ close }: Props) => {
  const { squad, setSquad } = useContext(SquadContext);

  const [confirmation, setConfirmation] = useState(false);

  const [createSquad, { data, loading, error }] = useMutation<Result>(CREATE_SQUAD);
  console.log(data, error, loading)

  const [squadName, setSquadName] = useState("");
  const [validation, setValidation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setValidation(true);
    setSquadName(e.target.value);
  } 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const valid = validateSquadName(squadName);
    if (!valid) return setValidation(false);
    try {
      await createSquad({
        variables: {
          name: squadName,
          characters: squad.map((s) => s.id)
        }
      })
      setSquad([]);
      setSquadName("");
      setConfirmation(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (error) {
      error.graphQLErrors[0].message.includes("Unique constraint")
      ? setErrorMessage("You already have a Squad with that name!")
      : setErrorMessage(error.graphQLErrors[0].message)
    }
  }, [error])
  if (confirmation) return <>
    <p className='m-2'>Squad Submitted!!!</p>
    <button 
      className='bg-slate-500 hover:bg-slate-600 p-2 rounded-xl text-white font-bold self-center' 
      onClick={close}>
        Close
    </button>
  </>
  return (
      <Form 
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        loading={loading}
        submit="Submit!">
        <p className='text-left'>Choose a name for your Squad: </p>
        <Input 
          value={squadName}
          placeholder='Choose a name for your Squad...'
          type={"text"}
          validation={validation}
          handleChange={handleChange}
          message={"Your Squad needs a name!"}
        />
      </Form>
  )
}

export default SubmitSquadStep2