import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const userRoutes = express.Router();

//--------Get from Server to Backend--------//
// userRoutes.get("/", async (req, res) => {
//   let MongoDbUser = await userModel.find();
//   res.send(MongoDbUser);
// });

//--------Get Single User Data To Login---from Backend--------//
userRoutes.post("/signin", async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return
    }
  }
  res.status(401).send({ msg: "User Email  is not  valid!" });
});

// Post Registered User Data frontend to Backend--------//
userRoutes.post('/registration',async (req, res)=>{
  let registeredUser = new User({
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password)
  })
  const user = await registeredUser.save()
  res.send({ 
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user)
  })
})
 

export default userRoutes;
