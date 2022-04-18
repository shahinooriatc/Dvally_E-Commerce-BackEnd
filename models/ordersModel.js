import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quality: { type: Number, },
        img: { type: String },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: String, },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    productPrice: { type: Number, required: true },
    shippingPrice: {
      type: Number,
      required: true,
    },
    taxAmount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    isPaid: {
      type: Boolean,
      //  required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
      // required: true
    },
  },
  {
    timesStamps: true,
  }
);

const orders = mongoose.model("Orders", orderSchema);
export default orders;
