import express from "express";
import Product from "../models/productModel.js";
import userModel from "../models/userModel.js";
// import  data from "../data.js";
import data from "../E-commerceAPI.js";
import userData from "../userData.js";

const rootRoutes = express.Router();

//--------Post from Frontend to Backend--------//
rootRoutes.post("/", async (req, res) => {
  await Product.remove({});
  const product = await Product.insertMany(data);
  await userModel.remove({});
  const user = await userModel.insertMany(userData);
  res.send(user);
});

export default rootRoutes;
