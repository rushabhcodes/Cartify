import { Request, Response } from "express";
import { cartService, CartItemInput } from "../services/cart.service";

export const cartController = {
  getCart: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cart = await cartService.getCart(userId);
    res.json(cart);
  },

  addItem: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data: CartItemInput = req.body;
    const item = await cartService.addItem(userId, data);
    res.status(201).json(item);
  },

  removeItem: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const itemId = Number(req.params.itemId);
    const deleted = await cartService.removeItem(userId, itemId);
    if (!deleted) return res.status(404).json({ error: "Item not in cart" });
    res.status(204).send();
  },

  clearCart: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await cartService.clearCart(userId);
    res.status(204).send();
  },
};
