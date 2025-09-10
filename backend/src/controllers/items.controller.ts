import { Request, Response } from "express";
import { itemsService, ItemFilter } from "../services/items.service";

export const itemsController = {
  getAll: async (req: Request, res: Response) => {
    const filters: ItemFilter = {
      category: req.query.category as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    };
    const items = await itemsService.getAll(filters);
    res.json(items);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const item = await itemsService.getById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  },

  create: async (req: Request, res: Response) => {
    const { name, price, category } = req.body;
    const item = await itemsService.create({ name, price, category });
    res.status(201).json(item);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;
    const item = await itemsService.update(id, data);
    res.json(item);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await itemsService.delete(id);
    res.status(204).send();
  },
};
