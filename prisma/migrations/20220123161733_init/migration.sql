/*
  Warnings:

  - You are about to drop the column `account_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_account_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `account_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Account_user_id_key` ON `Account`(`user_id`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
