/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `productCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerAddress` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerCellPhone` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `customerAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerCellPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('pending', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('admin', 'colaborator', 'customer') NOT NULL DEFAULT 'colaborator';

-- CreateTable
CREATE TABLE `orderedProduct` (
    `id` VARCHAR(191) NOT NULL,
    `units` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `productCategory_name_key` ON `productCategory`(`name`);
