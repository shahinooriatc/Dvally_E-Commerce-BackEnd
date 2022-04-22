import express from "express";
import Orders from "../models/ordersModel.js";
import { isAuth } from "../utils.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config()
const ordersRoutes = express.Router();
const stripe = new Stripe(process.env.Stripe_Secret_key || '',null)

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

//----Get Order from -Backend--- to Frontend--------//
ordersRoutes.get("/:id", isAuth, async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ msg: "Order Not Found" });
  }
});

//----Payment Using Paypal Gateway  from -Backend--- to Frontend--------//
ordersRoutes.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Orders.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      update_time: req.body.update_time,
      email: req.body.email_address,
    };
    const updataOrder = await order.save();
    res.send({ message: "Order Paid SuccessFully", updataOrder });
  } else {
    res.status(404).send({ message: "Order Payment Failed" });
  }
});

//----Payment Using Stripes Gateway  from -Backend--- to Frontend--------//
ordersRoutes.post("/:id/stripe", isAuth, async (req, res) => {
  const { token = {}, amount = 0 } = req.body;

  if (!object.keys(token).length || !amount) {
    res.status(400).send({ message: "Order Not Found" });
  }

  const { id: customerId } = await stripe.customer
    .create({
      email: token.email,
      source: token.id,
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  const invoiceId = `${
    token.email
  } - ${Math.random().toString()}- ${Date.now().toString()}`;

  const charge = await stripe.ChargesResource
    .create(
      {
        amount: amount * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Dvally Payment",
      },
      {
        idempotencyKey: invoiceId,
      }
    )
    .catch((error) => {
      return null;
    });

  if (!charge) {
    res.status(500).send({ message: "Order Not Found" });
  }
  res
    .status(201)
    .send({ message: "Strips Payment Completed Successfully Done" });
});

export default ordersRoutes;
