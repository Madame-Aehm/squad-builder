const validateSquadName = (squadName: string) => {
  return squadName.trim().length > 0 ? true : false;
}

export default validateSquadName