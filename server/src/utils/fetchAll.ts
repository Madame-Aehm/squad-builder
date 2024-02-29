import cache from "../config/cache.js"

type fetchAllRes<ResType> = {
  count: number
  previous: string | null
  next: string | null
  results: ResType[]
}

interface hasID {
  id: string
}

async function fetchAll<ResType, EndType extends hasID>(
  url: string, 
  formatFunction: (e: ResType) => EndType, 
  cacheKeyAll: string,
  cacheKeySingle: string): Promise<EndType[]> {
  try {
    const firstResult = await (await fetch(url)).json() as fetchAllRes<ResType>;
    const pages = Math.round(firstResult.count / 10);
    const fetches = [];
    for (let i = 2; i <= pages; i++) {
      fetches.push(fetch(`${url}?page=${i}`));
    }
    const remainingResponses = await Promise.all(fetches) as Response[];
    const remainingResults = await Promise.all(remainingResponses.map((res) => res.json())) as fetchAllRes<ResType>[];
    const formattedArray = firstResult.results.map((res) => {
      return formatFunction(res);
    })
    remainingResults.forEach((result: fetchAllRes<ResType>) => {
      result.results.forEach((res) => {
        formattedArray.push(formatFunction(res));
      })
    })
    const toCache = formattedArray.map((res) => {
      return { key: `${cacheKeySingle}${res.id}`, val: res }
    })
    const success = cache.mset<EndType | EndType[]>([ ...toCache, { key: cacheKeyAll, val: formattedArray } ]);
    console.log(`${cacheKeyAll} saved to cache for next request: `, success);
    return formattedArray
  } catch (error) {
    console.log(error);
  }
}

export default fetchAll