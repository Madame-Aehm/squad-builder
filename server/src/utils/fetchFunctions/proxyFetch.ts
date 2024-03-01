const proxyFetch = async <T> (query: string): Promise<T> => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch("https://swapi-graphql.netlify.app/.netlify/functions/index", {
      method: "POST",
      headers,
      body: query
    })
    const result = await response.json() as T;
    return result
  } catch (error) {
    console.log(error);
  }
}

export default proxyFetch