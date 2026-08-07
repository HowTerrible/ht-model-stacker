-- CreateTable
CREATE TABLE "article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'TRIVIA',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "productId" INTEGER,
    "manufacturerId" INTEGER,
    "tags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "article_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "article_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "article_productId_idx" ON "article"("productId");

-- CreateIndex
CREATE INDEX "article_manufacturerId_idx" ON "article"("manufacturerId");

-- CreateIndex
CREATE INDEX "article_type_status_idx" ON "article"("type", "status");
