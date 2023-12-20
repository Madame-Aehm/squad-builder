export interface AllPeopleFetchResult {
  allPeople: PersonSummary[]
}

export interface PersonSummary {
  id: string,
  image: string,
  name: string,
  species: SpeciesSummary
}

export interface SpeciesSummary {
  id: string,
  name: string
}