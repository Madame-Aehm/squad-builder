import cache from "../../config/cache.js";

interface hasID {
  id: string
}

async function fetchSingle<ResType, EndType extends hasID>(
  url: string, 
  formatFunction: (e: ResType) => EndType,
  cacheKey?: string): Promise<EndType> {
    const response = await fetch(url);
    const result = await response.json() as ResType;
    const formatted = formatFunction(result);
    if (cacheKey) {
      cache.set(`${cacheKey}${formatted.id}`, formatted);
    }
    return formatted
}

export default fetchSingle