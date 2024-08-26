async function fetchArray(array, formatFunction) {
    const fetches = array.map((url) => fetch(url));
    const responses = await Promise.all(fetches);
    const results = await Promise.all(responses.map((res) => res.json()));
    const formatted = results.map((res) => formatFunction(res));
    return formatted;
}
export default fetchArray;
