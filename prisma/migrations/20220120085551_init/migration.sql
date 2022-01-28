/*
  Warnings:

  - You are about to drop the column `userId` on the `address` table. All the data in the column will be lost.
  - You are about to alter the column `issuedDate` on the `certification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `startDate` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `endDate` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `userId` on the `experience` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `date` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `userId` on the `portfolio` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `review` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `deliveryperiod` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `freelancer_id` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `searchtag` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `delivery_period` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourly_rate` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search_tag` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_title` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `experience` DROP FOREIGN KEY `Experience_userId_fkey`;

-- DropForeignKey
ALTER TABLE `portfolio` DROP FOREIGN KEY `Portfolio_userId_fkey`;

-- AlterTable
ALTER TABLE `addon` ADD COLUMN `serviceId` INTEGER NULL;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `certification` ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `issuedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `education` ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `startDate` DATETIME(3) NOT NULL,
    MODIFY `endDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `experience` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `portfolio` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `deliveryperiod`,
    DROP COLUMN `freelancer_id`,
    DROP COLUMN `searchtag`,
    ADD COLUMN `delivery_period` VARCHAR(191) NOT NULL,
    ADD COLUMN `hourly_rate` VARCHAR(191) NOT NULL,
    ADD COLUMN `search_tag` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `jobTitle`,
    DROP COLUMN `name`,
    ADD COLUMN `job_title` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certification` ADD CONSTRAINT `Certification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Addon` ADD CONSTRAINT `Addon_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
