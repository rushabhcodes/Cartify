import express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { itemsController } from "../controllers/items.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management endpoints
 */

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of items
 */
router.get("/", asyncHandler(itemsController.getAll));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Item found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "IPhone 17"
 *               price: 115000
 *               category: "electronic"
 *       404:
 *         description: Item not found
 */
router.get("/:id", asyncHandler(itemsController.getById));

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *           example:
 *             name: "IPhone 17"
 *             price: 115000
 *             category: "electronic"
 *     responses:
 *       201:
 *         description: Item created
 */
router.post("/", asyncHandler(itemsController.create));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   patch:
 *     summary: Update an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *           example:
 *             name: "IPhone 17 Pro"
 *             price: 125000
 *             category: "electronic"
 *     responses:
 *       200:
 *         description: Item updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "IPhone 17 Pro"
 *               price: 125000
 *               category: "electronic"
 */
router.patch("/:id", asyncHandler(itemsController.update));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Item deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Item deleted successfully"
 */
router.delete("/:id", asyncHandler(itemsController.delete));

export default router;
