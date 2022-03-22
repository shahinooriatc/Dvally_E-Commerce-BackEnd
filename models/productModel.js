import mongoose  from 'mongoose';
const {Schema}=mongoose;

const ProductModel = new Schema(
  {
    name: { type: String, require: true },
    img: { type: String, require: true },
    price: { type: Number, require: true },
    totalrating: { type: Number },
    description: { type: String, require: true },
    rating: { type: Number },
    slug: { type: Number, require: true, unique: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    coupon: { type: String },
    discount: { type: Number },
    totalsale: { type: Number },
    discountlimit: { type: Number },
  },
  {
    timestamp: true,
  }
);

const product = mongoose.model("product", ProductModel);

export default product;
