import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ user }, process.env.privateKey, {    expiresIn: "1d" })
};
