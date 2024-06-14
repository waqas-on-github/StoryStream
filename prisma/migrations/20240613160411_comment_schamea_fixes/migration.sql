/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comments_userId_key" ON "Comments"("userId");
