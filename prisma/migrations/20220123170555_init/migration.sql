/*
  Warnings:

  - You are about to drop the column `account_id` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_account_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `account_id`;
