import { AllPeopleFetchResult } from '@/@types';
import { InputValues } from '@/@types/auth';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

type Props = {
  data: AllPeopleFetchResult | undefined,
  inputValues: InputValues,
  setInputValues: Dispatch<SetStateAction<InputValues>>
}

type input = "nameInput" | "speciesInput"

function Search({ data, inputValues, setInputValues }: Props) {
  const species = data ? Array.from(new Set(data.allPeople.filter((p) => p.species).map((p) => p.species!.name).sort())) : [];
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, input:input) => {
    setInputValues({
      ...inputValues,
      [input]: e.target.value
    })
  }
  return (
    <div className="flex flex-wrap justify-center sm:justify-center gap-2 mt-3">
      <select 
        className="rounded-md bg-slate-50" 
        onChange={(e) => onChangeHandler(e, "speciesInput")}
        value={inputValues.speciesInput}>
        <option value={""}>Species</option>
        <option value={"Unknown"}>Unknown</option>
        { species.map((s, i) => <option key={s} value={s}>{s}</option>) }
      </select>
      <input 
        className="grow p-2 rounded-md bg-slate-50" 
        onChange={(e) => onChangeHandler(e, "nameInput")}
        value={inputValues.nameInput}
        placeholder="Start typing a character's name...."
      />
    </div>
  )
}

export default Search