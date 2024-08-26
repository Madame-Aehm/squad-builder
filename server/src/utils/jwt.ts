import jwt from "jsonwebtoken";
import 'dotenv/config'
import { User } from "../@types/auth";

export const generateToken = (user: User) => {
  const payload = {
    sub: user._id
  }
  const options = {
    expiresIn: "5d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options)
  return token
}

export const authenticate = (token: string): null | string => {
  let id = null
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return
    }
    id = decoded.sub;
  });
  return id
}