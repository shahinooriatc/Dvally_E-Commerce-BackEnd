import express from "express";
import Product from "../models/productModel.js";

const productRoutes = express.Router();

//----Get from MongoDbProduct Server to Backend--------//
productRoutes.get("/", async (req, res) => {
  let MongoDbProduct = await Product.find();
  res.send(MongoDbProduct);
});

//--Get Single Product---from MongoDbProduct----Server--//
productRoutes.get("/:slug", async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

export default productRoutes;
