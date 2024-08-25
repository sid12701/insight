/*
  Warnings:

  - Changed the type of `month` on the `ChatSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChatSession" DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;
