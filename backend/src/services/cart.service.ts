import { prisma } from "../config";

export interface CartItemInput {
  itemId: number;
  quantity: number;
}

export const cartService = {
  async getCart(userId: number) {
    return prisma.cart.findMany({
      where: { userId },
      include: { item: true },
    });
  },

  async addItem(userId: number, { itemId, quantity }: CartItemInput) {
    // Check if item already in cart
    const existing = await prisma.cart.findFirst({
      where: { userId, itemId },
    });

    if (existing) {
      return prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }

    return prisma.cart.create({
      data: { userId, itemId, quantity },
    });
  },

  async removeItem(userId: number, itemId: number) {
    const existing = await prisma.cart.findFirst({
      where: { userId, itemId },
    });

    if (!existing) return null;

    return prisma.cart.delete({ where: { id: existing.id } });
  },

  async clearCart(userId: number) {
    return prisma.cart.deleteMany({ where: { userId } });
  },
};
