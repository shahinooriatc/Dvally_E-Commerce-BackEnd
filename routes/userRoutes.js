import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const userRoutes = express.Router();

//--------Get from Server to Backend--------//
// userRoutes.get("/", async (req, res) => {
//   let MongoDbUser = await userModel.find();
//   res.send(MongoDbUser);
// });

//--------Get Single User--------from Backend--------//
userRoutes.post("/signin", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compare(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ msg: "User Email or Password is not  valid!" });
});

export default userRoutes;
