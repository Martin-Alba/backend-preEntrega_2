import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productModel.find().lean().exec();
  console.log(products);
  res.render("products", { products });
});

export default router;
