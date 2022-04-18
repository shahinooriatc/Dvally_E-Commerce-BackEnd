import express from "express";
import Orders from "../models/ordersModel.js";
import { isAuth } from "../utils.js";

const ordersRoutes = express.Router();

//----Post Order from Frontend---- to Backend--------//
ordersRoutes.post("/", isAuth, async (req, res) => {
  const orders = new Orders({
    orderItems: req.body.orderItems.map((p) => ({ ...p, product: p._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    productPrice: req.body.productPrice,
    shippingPrice: req.body.shippingPrice,
    taxAmount: req.body.taxAmount,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const order = await orders.save();
  res.status(201).send({ msg: "New Order created successfully", order });
});



export default ordersRoutes;
