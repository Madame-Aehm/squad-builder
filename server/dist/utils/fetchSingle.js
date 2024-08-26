import cache from "../config/cache.js";
async function fetchSingle(url, formatFunction, cacheKey, id) {
    const result = await (await fetch(url)).json();
    const formatted = formatFunction(result);
    const success = cache.set(`${cacheKey}${id}`, formatted);
    console.log(`${cacheKey}${id} saved to cache for next request: `, success);
    return formatted;
}
export default fetchSingle;
