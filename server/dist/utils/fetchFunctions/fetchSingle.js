import cache from "../../config/cache.js";
async function fetchSingle(url, formatFunction, cacheKey) {
    const response = await fetch(url);
    const result = await response.json();
    const formatted = formatFunction(result);
    if (cacheKey) {
        cache.set(`${cacheKey}${formatted.id}`, formatted);
    }
    return formatted;
}
export default fetchSingle;
//# sourceMappingURL=fetchSingle.js.map