import data from "./E-commerceAPI.js";
import discount from "./discount.js";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import rootRoutes from "./routes/rootRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const mongoUrl = process.env.mongo_url;
const app = express();
app.use(express.json());

import bodyParser from "body-parser";

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("mongodb connect successfully Done");
  })
  .catch((err) => {
    console.log("mongodb connect error", err);
  });

app.use("/products", productRoutes);
//--------Get Data from Backend----------//
// app.get('/pros', async (req, res) => {
//   let MongoDbProduct = await product.find()
//   console.log(MongoDbProduct);
//   res.send(MongoDbProduct)
// })

app.use("/api/product", rootRoutes);
app.use("/api/user", userRoutes);
//--------Post from Frontend to Backend--------//
// app.post("/pros", (req, res) => {
//   let profile = new product({
//     name: req.body.name,
//     price: req.body.price,
//   })
//   profile.save().then((data) => {
//     res.status(201).json(data)
//   }).catch((err) => {
//     console.log(err);
//   })
// })

//--------Get all products from Backend To Frontend--------//
// app.get("/products", (req, res) => {
//   res.send(data);
// });

//--------Get Single Product--------from Backend--------//
// app.get("/products/:slug", (req, res) => {
//   let product = data.find((item) => {
//     if (req.params.slug == item.slug) {
//       return item;
//     }
//   });
//   res.send(product);
// });

app.get("/productcart/:id", (req, res) => {
  let product = data.find((item) => {
    if (req.params.id == item._id) {
      return item;
    }
  });
  res.send(product);
});

app.get("/discount", (req, res) => {
  res.send(discount);
});

app.get("/categories/:cat", (req, res) => {
  let categoryArr = [];
  data.map((item) => {
    if (req.params.cat == item.category) {
      categoryArr.push(item);
    }
  });
  res.send(categoryArr);
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
