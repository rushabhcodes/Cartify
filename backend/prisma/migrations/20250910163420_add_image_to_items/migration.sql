/*
  Warnings:

  - A unique constraint covering the columns `[userId,itemId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Item" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_itemId_key" ON "public"."Cart"("userId", "itemId");
