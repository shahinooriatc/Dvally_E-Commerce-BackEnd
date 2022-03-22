import express  from 'express';
import Product from "../models/productModel.js"
// import  data from "../data.js";
import  data from "../E-commerceAPI.js";

const rootRoutes = express.Router();

//--------Post from Frontend to Backend--------//
rootRoutes.post("/", async (req, res) => {
   await Product.remove({})
  const product = await Product.insertMany(data);
  res.send(product);
});



export default rootRoutes;