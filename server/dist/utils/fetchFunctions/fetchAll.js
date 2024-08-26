import cache from "../../config/cache.js";
async function fetchAll(url, formatFunction, cacheKeyAll, cacheKeySingle) {
    try {
        const firstResult = await (await fetch(url)).json();
        const pages = Math.round(firstResult.count / 10);
        const fetches = [];
        for (let i = 2; i <= pages; i++) {
            fetches.push(fetch(`${url}?page=${i}`));
        }
        const remainingResponses = await Promise.all(fetches);
        const remainingResults = await Promise.all(remainingResponses.map((res) => res.json()));
        const formattedArray = firstResult.results.map((res) => {
            return formatFunction(res);
        });
        remainingResults.forEach((result) => {
            result.results.forEach((res) => {
                formattedArray.push(formatFunction(res));
            });
        });
        const toCache = formattedArray.map((res) => {
            return { key: `${cacheKeySingle}${res.id}`, val: res };
        });
        const success = cache.mset([...toCache, { key: cacheKeyAll, val: formattedArray }]);
        console.log(`${cacheKeyAll} saved to cache for next request: `, success);
        return formattedArray;
    }
    catch (error) {
        console.log(error);
    }
}
export default fetchAll;
//# sourceMappingURL=fetchAll.js.map