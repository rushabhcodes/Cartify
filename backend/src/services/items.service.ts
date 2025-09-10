import { prisma } from "../config/";

export interface ItemFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export const itemsService = {
    
    async getAll(filters: ItemFilter = {}) {
        const { category, minPrice, maxPrice } = filters;

        const where: any = {};
        if (category) where.category = category;
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice;
            if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        return prisma.item.findMany({ where });
    },

    async getById(id: number) {
        return prisma.item.findUnique({ where: { id } });
    },

    async create(data: { name: string; price: number; category: string; image?: string }) {
        return prisma.item.create({ data });
    },

    async update(
        id: number,
        data: Partial<{ name: string; price: number; category: string; image: string }>
    ) {
        return prisma.item.update({ where: { id }, data });
    },

    async delete(id: number) {
        return prisma.item.delete({ where: { id } });
    },
};
