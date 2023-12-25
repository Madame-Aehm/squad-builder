/* eslint-disable react-hooks/exhaustive-deps */
import { AllPeopleFetchResult, InputValues, PersonSummary } from "@/@types";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import PersonListItem from "@/components/PersonListItem";
import Search from "@/components/Search";
import SquadMember from "@/components/SquadMember";
import { AuthContext } from "@/context/authContext";
import { SquadContext } from "@/context/squadContext";
import { ALL_PEOPLE } from "@/graphql/queries"
import filterPeople from "@/utils/filterPeople";
import { useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react";


export default function Home() {
  const { data, error, loading } = useQuery<AllPeopleFetchResult>(ALL_PEOPLE);
  console.log(data, error, loading)
  const { squad } = useContext(SquadContext);
  const [showRules, setShowRules] = useState(false);

  const [peopleArray, setPeopleArray] = useState<PersonSummary[]>([])
  const [inputValues, setInputValues] = useState<InputValues>({
    nameInput: "",
    speciesInput: ""
  })

  useEffect(() => {
    const filteredPeople = data ? filterPeople(data.allPeople, inputValues) : []; 
    setPeopleArray(filteredPeople);
  }, [data, inputValues.nameInput, inputValues.speciesInput])

  return loading ? <Loading /> : (
    <main className="text-center flex flex-col">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Build your Squad!
      </h1>

      <div className={`h-40 w-full bg-slate-50 rounded-md self-center p-2 flex items-center overflow-x-auto ${!squad.length || squad.length <= 3 ? "justify-center" : ""}`}>
        { !squad.length ? 
          <span>You haven't selected any Squad Members yet...</span> :
            <div className={`flex gap-2`}>
              { squad.map((sm) => {
                  return (
                    <SquadMember key={sm.id} squadMember={sm} />
                  )
              }) }
          </div>
        }
      </div>
      <button className="self-end font-bold" onClick={() => setShowRules(true)}>Read the Rules </button> 
      <Modal state={showRules} setState={setShowRules} title={"Rules: "}>
        <p className="mb-2">Search for your favourite characters and add them to a Squad!</p>
        <p className="mb-2">
          In deep space, <em>diversity</em> is key! You can&apos;t have two characters of the same species in the same squad.
          If a character's species is unknown, they can always be added. 
        </p>
        <p className="mb-2">You squad must have between 3-5 members to be submitted.</p>
      </Modal>

      <div className="self-stretch">
        <Search data={data} inputValues={inputValues} setInputValues={setInputValues} />
        <div className="bg-slate-50 mt-2 max-h-64 overflow-y-auto rounded-md">
          { peopleArray.map((person) => {
            return <PersonListItem key={person.id} person={person} />
          }) }
        </div>
      </div>
      

      { error && <Error message={ error.message } /> }
    </main>
  )
}
