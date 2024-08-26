import cache from "../config/cache.js";
const checkCache = (key) => {
    const isCached = cache.has(key);
    if (isCached)
        console.log(`using cached ${key}`);
    return {
        cached: isCached,
        result: cache.get(key)
    };
};
export default checkCache;
//# sourceMappingURL=checkCache.js.map