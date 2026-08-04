-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fullName" TEXT,
    "country" TEXT,
    "website" TEXT,
    "description" TEXT,
    "logoUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "modelNo" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'MODEL',
    "modelType" TEXT,
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
    CONSTRAINT "product_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "price_record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CNY',
    "source" TEXT NOT NULL DEFAULT 'MANUAL',
    "sourceUrl" TEXT,
    "note" TEXT,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "price_record_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "purchasedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchasePrice" REAL,
    "currency" TEXT NOT NULL DEFAULT 'CNY',
    "channel" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UNSTARTED',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stack_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ABANDONED',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "wip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wip_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_relation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "relatedProductId" INTEGER NOT NULL,
    "relationType" TEXT NOT NULL DEFAULT 'COMPETITOR',
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_relation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_relation_relatedProductId_fkey" FOREIGN KEY ("relatedProductId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_name_key" ON "manufacturer"("name");

-- CreateIndex
CREATE INDEX "manufacturer_name_idx" ON "manufacturer"("name");

-- CreateIndex
CREATE INDEX "product_manufacturerId_idx" ON "product"("manufacturerId");

-- CreateIndex
CREATE INDEX "product_name_idx" ON "product"("name");

-- CreateIndex
CREATE INDEX "product_kind_modelType_idx" ON "product"("kind", "modelType");

-- CreateIndex
CREATE INDEX "price_record_productId_recordedAt_idx" ON "price_record"("productId", "recordedAt");

-- CreateIndex
CREATE INDEX "stack_userId_purchasedAt_idx" ON "stack"("userId", "purchasedAt");

-- CreateIndex
CREATE INDEX "stack_productId_idx" ON "stack"("productId");

-- CreateIndex
CREATE INDEX "wip_userId_status_idx" ON "wip"("userId", "status");

-- CreateIndex
CREATE INDEX "wip_productId_idx" ON "wip"("productId");

-- CreateIndex
CREATE INDEX "product_relation_productId_idx" ON "product_relation"("productId");

-- CreateIndex
CREATE INDEX "product_relation_relatedProductId_idx" ON "product_relation"("relatedProductId");

-- CreateIndex
CREATE UNIQUE INDEX "product_relation_productId_relatedProductId_relationType_key" ON "product_relation"("productId", "relatedProductId", "relationType");
