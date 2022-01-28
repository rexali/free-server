/*
  Warnings:

  - You are about to drop the column `deliveryperiod` on the `addon` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `addon` table. All the data in the column will be lost.
  - You are about to drop the column `issuedDate` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `offer_id` on the `favourite` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `freelancer_id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `freelancer_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `offer_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `addon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `charge` on table `addon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `local_govt` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `issued_at` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `certification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `certification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ended_at` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Made the column `institution` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ended_at` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Made the column `employer` on table `experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `experience` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `service_id` to the `Favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `message` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `created_at` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `notification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `addon_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `message` on table `review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subcategory` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `picture` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `charge` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_period` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hourly_rate` on table `service` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `account_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `addon` DROP FOREIGN KEY `Addon_serviceId_fkey`;

-- AlterTable
ALTER TABLE `addon` DROP COLUMN `deliveryperiod`,
    DROP COLUMN `serviceId`,
    ADD COLUMN `service_id` INTEGER NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `charge` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `address` MODIFY `street` VARCHAR(191) NOT NULL,
    MODIFY `local_govt` VARCHAR(191) NOT NULL,
    MODIFY `state` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `certification` DROP COLUMN `issuedDate`,
    ADD COLUMN `issued_at` DATETIME(3) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `education` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `ended_at` DATETIME(3) NOT NULL,
    ADD COLUMN `started_at` DATETIME(3) NOT NULL,
    MODIFY `institution` VARCHAR(191) NOT NULL,
    MODIFY `course` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `experience` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `ended_at` DATETIME(3) NOT NULL,
    ADD COLUMN `started_at` DATETIME(3) NOT NULL,
    MODIFY `employer` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `favourite` DROP COLUMN `offer_id`,
    ADD COLUMN `service_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `date`,
    DROP COLUMN `freelancer_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL,
    MODIFY `message` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `date`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `date`,
    DROP COLUMN `freelancer_id`,
    DROP COLUMN `offer_id`,
    DROP COLUMN `price`,
    ADD COLUMN `addon_id` INTEGER NOT NULL,
    ADD COLUMN `charge` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `payment_status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `date`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NULL,
    MODIFY `rating` INTEGER NOT NULL,
    MODIFY `message` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `order_id` INTEGER NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `category` VARCHAR(191) NOT NULL,
    MODIFY `subcategory` VARCHAR(191) NOT NULL,
    MODIFY `picture` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `charge` VARCHAR(191) NOT NULL,
    MODIFY `delivery_period` VARCHAR(191) NOT NULL,
    MODIFY `hourly_rate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `account_id` INTEGER NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `year_exp` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `channel` VARCHAR(191) NOT NULL,
    `charge` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `transaction_amount` INTEGER NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `account_id` INTEGER NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Addon` ADD CONSTRAINT `Addon_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
