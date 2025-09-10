import express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { cartController } from "../controllers/cart.controller";
import auth from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get("/", auth, asyncHandler(cartController.getCart));

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 */
router.post("/", auth, asyncHandler(cartController.addItem));

/**
 * @swagger
 * /api/v1/cart/{itemId}:
 *   delete:
 *     summary: Remove an item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Item removed
 *       404:
 *         description: Item not found
 */
router.delete("/:itemId", auth, asyncHandler(cartController.removeItem));

/**
 * @swagger
 * /api/v1/cart/clear:
 *   delete:
 *     summary: Clear all items in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Cart cleared
 */
router.delete("/clear", auth, asyncHandler(cartController.clearCart));

export default router;
