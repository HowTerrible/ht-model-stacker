/*
  Warnings:

  - Added the required column `path` to the `theme` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "path" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "theme_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "theme" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_theme" ("createdAt", "id", "name", "parentId", "sortOrder", "status", "updatedAt") SELECT "createdAt", "id", "name", "parentId", "sortOrder", "status", "updatedAt" FROM "theme";
DROP TABLE "theme";
ALTER TABLE "new_theme" RENAME TO "theme";
CREATE INDEX "theme_parentId_idx" ON "theme"("parentId");
CREATE INDEX "theme_name_idx" ON "theme"("name");
CREATE INDEX "theme_path_idx" ON "theme"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
