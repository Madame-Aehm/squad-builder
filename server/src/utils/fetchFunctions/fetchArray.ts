async function fetchArray<ResType, EndType>(array: string[], formatFunction: (e: ResType) => EndType): Promise<EndType[]> {
  const fetches = array.map((url) => fetch(url));
  const responses = await Promise.all(fetches);
  const results = await Promise.all(responses.map((res) => res.json())) as ResType[];
  const formatted = results.map((res) => formatFunction(res));
  return formatted
}

export default fetchArray