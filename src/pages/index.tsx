/* eslint-disable @next/next/no-img-element */
import { AllPeopleFetchResult, PersonSummary } from "@/@types";
import PersonCard from "@/components/PersonCard";
import { ALL_PEOPLE } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react";


export default function Home() {
  const { data, error, loading } = useQuery<AllPeopleFetchResult>(ALL_PEOPLE);

  const [inputValue, setInputValue] = useState("");
  const [filteredArray, setFilteredArray] = useState<PersonSummary[]>([])
  console.log(data, error, loading);

  useEffect(() => {
    if (data && !inputValue) {
      setFilteredArray(data.allPeople)
    } else if (data && inputValue) {
      const result = data.allPeople.filter((person) => person.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredArray(result);
    }
  }, [data, inputValue])

  return (
    <main className="flex flex-col content-center flex-wrap text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Find your Squad!
      </h1>
      <p>
        Search for your favourite characters, or browse the collection, and add characters to a Squad.
      </p>
      <p>
        <b>Rules:</b> In deep space, diversity is key! You can&apos;t have two characters of the same species in the same squad.
      </p>
      <div className="flex flex-col content-center flex-wrap text-center">
        <input onChange={(e) => setInputValue(e.target.value)}/>
      </div>
      <div>
        <p>
          Scroll through all characters: 
        </p>
        <div className="flex flex-wrap gap-1 justify-evenly">
          { filteredArray.map((person) => {
            return (
              <PersonCard key={person.id} person={person} />
            )
          }) }
        </div>
      </div>
    </main>
  )
}
