import { Router } from "express";
import Cart from "../models/carts.model.js";
import mongoose from "mongoose";

const router = Router();
const { ObjectId } = mongoose.Types;

router.post("/add-to-cart", async (req, res) => {
  const { productId } = req.body;

  try {
    // Obtener el carrito existente o crear uno nuevo si no existe
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ cid: new ObjectId(), products: [] });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      existingProduct.quantity++;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/api/products");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ocurrió un error al agregar el producto al carrito" });
  }
});

router.post("/remove-from-cart", async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne();

    if (!cart) {
      throw new Error("El carrito no existe");
    }

    // Filtrar el producto que se desea eliminar del carrito
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.redirect("/api/products");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ocurrió un error al eliminar el producto del carrito" });
  }
});

export default router;