import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = mongoose.Schema({
  cid: Number,
  products: [
    {
      pid: Number,
      qty: Number,
    },
  ],
});

cartsSchema.plugin(mongoosePaginate);
const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;
