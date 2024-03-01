import cache from "../config/cache.js"
import extractID from "./extractID.js"

interface hasID {
  id: string
}

function cacheSearch<T extends hasID>(key: string, toFind: string[] | string, ext: string) {
  const exists = cache.has(key);
  if (exists) {
    const all = cache.get(key) as T[];
    if (typeof toFind === "string") {
      return all.find((e) => e.id === (toFind.includes("swapi.dev/") ? extractID(toFind, ext) : toFind))
    }
    return all.filter((item) => {
      let found = false;
      toFind.forEach((urlOrId) => {
        if (item.id === (urlOrId.includes("swapi.dev/") ? extractID(urlOrId, ext) : urlOrId)) found = true
      });
      return found
    })
  }
  return null
}

export default cacheSearch