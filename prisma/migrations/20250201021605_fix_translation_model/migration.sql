-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "wineId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CartItem_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "image" TEXT,
    "year" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "grapeVariety" TEXT,
    "body" TEXT,
    "servingTemp" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Wine" ("body", "createdAt", "grapeVariety", "id", "image", "name", "price", "rating", "region", "servingTemp", "stock", "type", "updatedAt", "year") SELECT "body", "createdAt", "grapeVariety", "id", "image", "name", "price", "rating", "region", "servingTemp", "stock", "type", "updatedAt", "year" FROM "Wine";
DROP TABLE "Wine";
ALTER TABLE "new_Wine" RENAME TO "Wine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
