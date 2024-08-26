const extractID = (url, extension) => {
    return url.split(extension)[1].replaceAll("/", " ").trim();
};
export default extractID;
//# sourceMappingURL=extractID.js.map