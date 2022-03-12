import data from "./E-commerceAPI.js";
import discount from "./discount.js";
import express from "express";
import 'dotenv/config'
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// const bodyParser =require('body-parser');
// const cors = require('cors')

// app.use(bodyParser.json())
// app.use(cors())

const mongoUrl = process.env.mongo_url;
const app = express();
app.use(express.json())


mongoose.connect(mongoUrl).then(() => {
  console.log('mongodb connect successfully Done')
}).catch(err => {
  console.log('mongodb connect error', err);
})


//-------------Profile Schema-------------//
const Product = new mongoose.Schema({
  name: { type: String, },
  price: { type: String, },

});

//--------Create model from Schema-----------//
const product = mongoose.model('product', Product);

//--------Get Data from Backend----------//
app.get('/pros', async (req, res) => {
  let MongoDbProduct = await product.find()
  console.log(MongoDbProduct);
  res.send(MongoDbProduct)
})


//--------Post from Frontend to Backend--------//
app.post("/pros", (req, res) => {

  console.log(req.body);
  let profile = new product({
    // name: 'Paper',
    // price: 100,
    name: req.body.name,
    price: req.body.price,
  })
  profile.save().then((data) => {
    console.log(data);
    res.status(201).json(data)
  }).catch((err) => {
    console.log(err);
  })
})


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send(data);
});

app.get("/products/:slug", (req, res) => {
  let product = data.find((item) => {
    if (req.params.slug == item.slug) {
      return item;
    }
  });
  res.send(product);
});

app.get("/productcart/:id", (req, res) => {
  let product = data.find((item) => {
    if (req.params.id == item._id) {
      return item;
    }
  });
  res.send(product);
});


app.get('/discount', (req, res) => {
  res.send(discount)
})

app.get("/categories/:cat", (req, res) => {
  let categoryArr = []
  data.map((item) => {
    if (req.params.cat == item.category) {
      categoryArr.push(item)
    }
  });
  res.send(categoryArr);
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
