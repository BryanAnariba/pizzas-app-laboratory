/*
  Warnings:

  - You are about to drop the column `phone` on the `Address` table. All the data in the column will be lost.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL;
