/*
  Warnings:

  - You are about to drop the column `modelType` on the `product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturerId" INTEGER NOT NULL,
    "themeId" INTEGER,
    "name" TEXT NOT NULL,
    "modelNo" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'MODEL',
    "modelTypes" TEXT,
    "material" TEXT,
    "accessoryMaterials" TEXT,
    "toolType" TEXT,
    "scale" TEXT,
    "year" INTEGER,
    "releaseDate" DATETIME,
    "description" TEXT,
    "manualUrl" TEXT,
    "photos" TEXT,
    "tags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ON_SALE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "product_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "theme" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("createdAt", "description", "id", "kind", "manualUrl", "manufacturerId", "modelNo", "name", "photos", "releaseDate", "scale", "status", "tags", "themeId", "toolType", "updatedAt", "year") SELECT "createdAt", "description", "id", "kind", "manualUrl", "manufacturerId", "modelNo", "name", "photos", "releaseDate", "scale", "status", "tags", "themeId", "toolType", "updatedAt", "year" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE INDEX "product_manufacturerId_idx" ON "product"("manufacturerId");
CREATE INDEX "product_themeId_idx" ON "product"("themeId");
CREATE INDEX "product_name_idx" ON "product"("name");
CREATE INDEX "product_kind_modelTypes_idx" ON "product"("kind", "modelTypes");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
