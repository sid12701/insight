/*
  Warnings:

  - You are about to drop the column `status` on the `ChatSession` table. All the data in the column will be lost.
  - Added the required column `month` to the `ChatSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatSession" DROP COLUMN "status",
ADD COLUMN     "month" TEXT NOT NULL;
