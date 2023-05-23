import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  status: Boolean,
  code: String,
  stock: Number,
  category: String,
  thumbnail: [],
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model("products", productSchema);

export default productModel;
