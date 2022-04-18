import data from "./E-commerceAPI.js";
import discount from "./discount.js";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import rootRoutes from "./routes/rootRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoUrl = process.env.mongo_url;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("mongodb connect successfully Done");
  })
  .catch((err) => {
    console.log("mongodb connect error", err);
  });

// Post All UserData frontend to Backend--------//
app.use("/api", rootRoutes);

// Post All ProductData frontend to Backend--------//
app.use("/api", rootRoutes);

// Post All Orders Data frontend to Backend--------//
app.use("/api/orders", ordersRoutes);

// Post individual registeredUser user from Frontend to Backend--------
app.use("/api/user", userRoutes);

//--------Get Data from Backend----------//
app.use("/products", productRoutes);

// Get individual user from Backend--------
app.use("/api/user", userRoutes);

//---Get Id_Wish Data from Backend------
app.get("/productcart/:id", (req, res) => {
  let product = data.find((item) => {
    if (req.params.id == item._id) {
      return item;
    }
  });
  res.send(product);
});

//---Get CategoryWish---Product from MongoDbProduct-Server--to Frontend//
// productRoutes.get("/categories/:cat", async (req, res) => {
//   let allProduct = await Product.find()

// let categoryArr = [];
// allProduct.map((item) => {
//   if (req.params.cat == item.category) {
//     categoryArr.push(item);
//   }
// });
// res.send(categoryArr);
// });

//---Get CategoryWish---Product from Local faceData....without auto Id
app.get("/categories/:cat", (req, res) => {
  let categoryArr = [];
  data.map((item) => {
    if (req.params.cat == item.category) {
      categoryArr.push(item);
    }
  });
  res.send(categoryArr);
});

app.get("/discount", (req, res) => {
  res.send(discount);
});

//Post Listening  Section............
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
