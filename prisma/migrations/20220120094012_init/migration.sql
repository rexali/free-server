/*
  Warnings:

  - You are about to drop the `mine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `addon` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `charge` VARCHAR(191) NULL,
    MODIFY `deliveryperiod` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `address` MODIFY `street` VARCHAR(191) NULL,
    MODIFY `local_govt` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `certification` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `education` MODIFY `institution` VARCHAR(191) NULL,
    MODIFY `course` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `experience` MODIFY `startDate` VARCHAR(191) NULL,
    MODIFY `endDate` VARCHAR(191) NULL,
    MODIFY `employer` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `user_id` INTEGER NULL,
    MODIFY `freelancer_id` INTEGER NULL,
    MODIFY `message` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `user_id` INTEGER NULL,
    MODIFY `freelancer_id` INTEGER NULL,
    MODIFY `offer_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `portfolio` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `startDate` VARCHAR(191) NULL,
    MODIFY `endDate` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `rating` VARCHAR(191) NULL,
    MODIFY `message` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL,
    MODIFY `subcategory` VARCHAR(191) NULL,
    MODIFY `picture` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `charge` VARCHAR(191) NULL,
    MODIFY `delivery_period` VARCHAR(191) NULL,
    MODIFY `hourly_rate` VARCHAR(191) NULL,
    MODIFY `search_tag` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `picture` VARCHAR(191) NULL,
    MODIFY `cover_picture` VARCHAR(191) NULL,
    MODIFY `about` VARCHAR(191) NULL,
    MODIFY `company` VARCHAR(191) NULL,
    MODIFY `job_title` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NULL,
    MODIFY `token` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `mine`;

-- DropTable
DROP TABLE `profile`;
