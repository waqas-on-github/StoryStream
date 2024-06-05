-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "featureImage" TEXT,
    "views" BIGINT,
    "upVote" BIGINT,
    "downVote" BIGINT,
    "text" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Articles" ("createdAt", "downVote", "featureImage", "id", "text", "upVote", "updatedAt", "userId", "views") SELECT "createdAt", "downVote", "featureImage", "id", "text", "upVote", "updatedAt", "userId", "views" FROM "Articles";
DROP TABLE "Articles";
ALTER TABLE "new_Articles" RENAME TO "Articles";
PRAGMA foreign_key_check("Articles");
PRAGMA foreign_keys=ON;
