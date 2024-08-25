/*
  Warnings:

  - Added the required column `year` to the `ChatSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "year" INTEGER NOT NULL;
