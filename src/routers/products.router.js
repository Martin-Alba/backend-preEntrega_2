import { Router } from "express";
import productModel from "../models/product.model.js";
import productManager from "../manager/products.manager.js";

const router = Router();

router.get("/", async (req, res) => {

  const options = {
    limit: parseInt(req.query.limit) || 10,
    page: parseInt(req.query.page) || 1,
    lean: true
  };

  try {
    const products = await productModel.paginate({}, options);
    res.status(201).render("products", products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Ocurrió un error al obtener los productos" });
  }
});

router.get('/create', async (req, res) => {
  res.render('create')
})

router.post("/", async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body);
    res.redirect("/api/products");
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Ocurrió un error al ingresar el producto" });
  }
});

export default router;
