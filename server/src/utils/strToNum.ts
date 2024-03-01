const strToNum = (variable) => {
  return isNaN(Number(variable)) ? null : Number(variable)
}

export default strToNum