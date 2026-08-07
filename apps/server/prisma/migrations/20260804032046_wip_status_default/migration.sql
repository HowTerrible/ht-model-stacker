-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage" TEXT NOT NULL DEFAULT 'UNASSEMBLED',
    "status" TEXT NOT NULL DEFAULT 'WIP',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "wip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wip_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wip" ("createdAt", "id", "notes", "productId", "stage", "startedAt", "status", "updatedAt", "userId") SELECT "createdAt", "id", "notes", "productId", "stage", "startedAt", "status", "updatedAt", "userId" FROM "wip";
DROP TABLE "wip";
ALTER TABLE "new_wip" RENAME TO "wip";
CREATE INDEX "wip_userId_status_idx" ON "wip"("userId", "status");
CREATE INDEX "wip_productId_idx" ON "wip"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
