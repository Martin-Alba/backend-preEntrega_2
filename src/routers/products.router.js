import { Router } from "express";
import productModel from "../models/product.model.js";
import productManager from "../manager/products.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await productModel.paginate(
      {},
      {
        page,
        limit,
        lean: true,
      }
    );

    products.prevLink = products.hasPrevPage
      ? `/api/products/${page - 1}/${limit}`
      : "";
    products.nextLink = products.hasNextPage
      ? `/api/products/${page + 1}/${limit}`
      : "";

    res.render("products", products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Ocurrió un error al obtener los productos" });
  }
});

router.get("/:page/:limit", async (req, res) => {
  let page = parseInt(req.params.page);
  if (!page) page = 1;

  let limit = parseInt(req.params.limit);
  if (!limit) limit = 10;

  const products = await productModel.paginate(
    {},
    {
      page,
      limit,
      lean: true,
    }
  );

  products.prevLink = products.hasPrevPage
    ? `/api/products/${page - 1}/${limit}`
    : "";
  products.nextLink = products.hasNextPage
    ? `/api/products/${page + 1}/${limit}`
    : "";
  console.log(products);
  res.render("products", products);
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
