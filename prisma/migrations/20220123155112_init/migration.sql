-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_account_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
