/*
  Warnings:

  - You are about to drop the column `progress` on the `wip` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "wipId" INTEGER,
    "purchasedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchasePrice" REAL,
    "currency" TEXT NOT NULL DEFAULT 'CNY',
    "channel" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UNSTARTED',
    "stage" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stack_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stack_wipId_fkey" FOREIGN KEY ("wipId") REFERENCES "wip" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_stack" ("channel", "createdAt", "currency", "id", "notes", "productId", "purchasePrice", "purchasedAt", "status", "updatedAt", "userId") SELECT "channel", "createdAt", "currency", "id", "notes", "productId", "purchasePrice", "purchasedAt", "status", "updatedAt", "userId" FROM "stack";
DROP TABLE "stack";
ALTER TABLE "new_stack" RENAME TO "stack";
CREATE INDEX "stack_userId_purchasedAt_idx" ON "stack"("userId", "purchasedAt");
CREATE INDEX "stack_productId_idx" ON "stack"("productId");
CREATE INDEX "stack_wipId_idx" ON "stack"("wipId");
CREATE TABLE "new_wip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage" TEXT NOT NULL DEFAULT 'UNASSEMBLED',
    "status" TEXT NOT NULL DEFAULT 'ABANDONED',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "wip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wip_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wip" ("createdAt", "id", "notes", "productId", "startedAt", "status", "updatedAt", "userId") SELECT "createdAt", "id", "notes", "productId", "startedAt", "status", "updatedAt", "userId" FROM "wip";
DROP TABLE "wip";
ALTER TABLE "new_wip" RENAME TO "wip";
CREATE INDEX "wip_userId_status_idx" ON "wip"("userId", "status");
CREATE INDEX "wip_productId_idx" ON "wip"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
