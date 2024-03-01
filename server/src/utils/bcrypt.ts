import bcrypt from "bcrypt";

export const encrypt = async(pw: string) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPw = await bcrypt.hash(pw, salt);
    return hashedPw
  } catch(error) {
    console.log("Error: ", error);
  }
}

export const verify = async (pw: string, hashedPw: string) => {
  const verified = bcrypt.compare(pw, hashedPw);
  return verified;
};