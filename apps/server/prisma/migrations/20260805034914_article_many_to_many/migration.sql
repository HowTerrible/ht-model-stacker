/*
  Warnings:

  - You are about to drop the column `manufacturerId` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `article` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ArticleToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArticleToManufacturer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleToManufacturer_A_fkey" FOREIGN KEY ("A") REFERENCES "article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToManufacturer_B_fkey" FOREIGN KEY ("B") REFERENCES "manufacturer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'TRIVIA',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "tags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_article" ("content", "createdAt", "id", "sourceUrl", "status", "tags", "title", "type", "updatedAt") SELECT "content", "createdAt", "id", "sourceUrl", "status", "tags", "title", "type", "updatedAt" FROM "article";
DROP TABLE "article";
ALTER TABLE "new_article" RENAME TO "article";
CREATE INDEX "article_type_status_idx" ON "article"("type", "status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToProduct_AB_unique" ON "_ArticleToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToProduct_B_index" ON "_ArticleToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToManufacturer_AB_unique" ON "_ArticleToManufacturer"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToManufacturer_B_index" ON "_ArticleToManufacturer"("B");
