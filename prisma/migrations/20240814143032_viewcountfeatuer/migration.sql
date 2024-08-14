/*
  Warnings:

  - You are about to drop the column `views` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "views";

-- CreateTable
CREATE TABLE "views" (
    "id" TEXT NOT NULL,
    "viewCounts" BIGINT,
    "viewerId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
