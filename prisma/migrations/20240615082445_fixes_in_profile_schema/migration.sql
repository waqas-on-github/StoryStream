/*
  Warnings:

  - You are about to drop the column `downVote` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `upVote` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "downVote",
DROP COLUMN "upVote";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "profilePic" DROP NOT NULL;
