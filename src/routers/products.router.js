import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productModel.paginate(
    {},
    {
      lean: true,
    }
  );
  res.render("products", products);
});

// /api/products/1/1
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

  res.render("products", products);
});

// primera letra mayuscula
router.get("/:category", async (req, res) => {
  let category = req.params.category;
  const products = await productModel.paginate(
    { category: category },
    {
      lean: true,
    }
  );
  if (category) {
    res.render("products", products);
  }
});

export default router;
