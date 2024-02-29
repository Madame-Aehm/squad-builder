const extractID = (url: string, extension: string) => {
  return url.split(extension)[1].replaceAll("/", " ").trim()
}

export default extractID