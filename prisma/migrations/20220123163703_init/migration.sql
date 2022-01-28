-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_user_id_fkey`;

-- AlterTable
ALTER TABLE `account` MODIFY `balance` INTEGER NULL,
    MODIFY `created_at` DATETIME(3) NULL,
    MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
