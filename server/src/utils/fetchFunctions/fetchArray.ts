import cache from "../../config/cache.js";
import extractID from "../extractID.js";

interface hasID {
  id: string
}

async function fetchArray<ResType, EndType extends hasID>(
  array: string[], 
  formatFunction: (e: ResType) => EndType, 
  cacheKey: string,
  ): Promise<EndType[]> {
  const keys = array.map((item) => `${cacheKey}${extractID(item, `${cacheKey}s`)}`);
  const cachedItems = Object.values(cache.mget(keys)) as EndType[];
  if (cachedItems.length === array.length) return cachedItems
  // not all items are cached
  const missing = array.filter((item) => {
    let found = true;
    for (let i = 0; i < cachedItems.length; i++) {
      if (extractID(item, `${cacheKey}s/`) === cachedItems[i].id) found = false;
    }
    return found
  })
  try {
    const fetches = missing.map((url) => fetch(url));
    const responses = await Promise.all(fetches);
    const results = await Promise.all(responses.map((res) => res.json())) as ResType[];
    const formatted = results.map((res) => formatFunction(res));
    cache.mset(formatted.map((item) => { return { key: `${cacheKey}${item.id}`, val: item }}))
    return [...formatted, ...cachedItems].sort((a,b) => Number(a.id) > Number(b.id) ? 1 : -1);
  } catch (error) {
    console.log(error);
  }
}

export default fetchArray