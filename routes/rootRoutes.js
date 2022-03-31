import express from "express";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
// import  data from "../data.js";
import data from "../E-commerceAPI.js";
import userData from "../userData.js";

const rootRoutes = express.Router();

//--------Post all Product from Frontend to Backend--------//
rootRoutes.get("/product", async (req, res) => {
  await Product.remove({});
  const product = await Product.insertMany(data);  
  res.send(product);
});

//--------Post all User from Frontend to Backend--------//
rootRoutes.get("/user",async (req, res)=>{
  await User.remove({});
  const user = await User.insertMany(userData);
  res.send(user)
})

export default rootRoutes;
