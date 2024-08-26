import bcrypt from "bcrypt";
export const encrypt = async (pw) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPw = await bcrypt.hash(pw, salt);
        return hashedPw;
    }
    catch (error) {
        console.log("Error: ", error);
    }
};
export const verify = async (pw, hashedPw) => {
    const verified = bcrypt.compare(pw, hashedPw);
    return verified;
};
//# sourceMappingURL=bcrypt.js.map