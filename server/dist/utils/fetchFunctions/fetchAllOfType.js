import cache from "../../config/cache.js";
async function fetchAll(url, formatFunction, cacheKeyAll, 
// cacheKeySingle: string,
num) {
    try {
        // const firstResult = await (await fetch(url)).json() as fetchAllRes<ResType>;
        // const pages = Math.round(firstResult.count / 10);
        const fetches = [];
        for (let i = 1; i <= num; i++) {
            fetches.push(fetch(`${url}/${i}`));
        }
        const responses = await Promise.all(fetches);
        const results = await Promise.all(responses.map((res) => res.json()));
        const formattedArray = results.map((res) => {
            return formatFunction(res);
        });
        // remainingResults.forEach((result: fetchAllRes<ResType>) => {
        //   result.results.forEach((res) => {
        //     formattedArray.push(formatFunction(res));
        //   })
        // })
        // const toCache = formattedArray.map((res) => {
        //   return { key: `${cacheKeySingle}${res.id}`, val: res }
        // })
        const success = cache.set(cacheKeyAll, formattedArray);
        console.log(`${cacheKeyAll} saved to cache for next request: `, success);
        return formattedArray;
    }
    catch (error) {
        console.log(error);
    }
}
export default fetchAll;
//# sourceMappingURL=fetchAllOfType.js.map