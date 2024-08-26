import cache from "../config/cache.js";
import extractID from "./extractID.js";
function cacheSearch(key, toFind, ext) {
    const exists = cache.has(key);
    if (exists) {
        const all = cache.get(key);
        if (typeof toFind === "string") {
            return all.find((e) => e.id === (toFind.includes("https://") ? extractID(toFind, ext) : toFind));
        }
        return all.filter((item) => {
            let found = false;
            toFind.forEach((urlOrId) => {
                if (item.id === (urlOrId.includes("https://") ? extractID(urlOrId, ext) : urlOrId))
                    found = true;
            });
            return found;
        });
    }
    return null;
}
export default cacheSearch;
//# sourceMappingURL=cacheSearch.js.map