import cache from "../config/cache.js";

async function fetchSingle<ResType, EndType>(
  url: string, 
  formatFunction: (e: ResType) => EndType, 
  cacheKey: string,
  id: string): Promise<EndType> {
    const result = await (await fetch(url)).json() as ResType;
    const formatted = formatFunction(result);
    const success = cache.set(`${cacheKey}${id}`, formatted);
    console.log(`${cacheKey}${id} saved to cache for next request: `, success);
    return formatted
}

export default fetchSingle