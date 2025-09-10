import * as authService from "../services/auth.service";
import { signToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "../config";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
    const { email, password } = req.body;
    const exists = await authService.findUserByEmail(email);
    if (exists) return res.status(400).json({ error: "Email already in use" });
    const user = await authService.createUser(email, password);
    const token = signToken({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email } });
}

// login optionally accepts `clientCart` array to merge (client-side cart)
export async function login(req: Request, res: Response) {
    const { email, password, clientCart } = req.body;
    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    // merge carts if clientCart provided: [{ itemId, quantity }]
    if (Array.isArray(clientCart) && clientCart.length) {
        for (const item of clientCart) {
            const existing = await prisma.cart.findFirst({
                where: { userId: user.id, itemId: item.itemId },
            });
            if (existing) {
                await prisma.cart.update({
                    where: { id: existing.id },
                    data: { quantity: existing.quantity + (item.quantity || 1) },
                });
            } else {
                await prisma.cart.create({
                    data: { userId: user.id, itemId: item.itemId, quantity: item.quantity || 1 },
                });
            }
        }
    }

    const token = signToken({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email } });
}
