-- CreateEnum
CREATE TYPE "BlacklistKind" AS ENUM ('jti', 'refresh', 'token');

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "kind" "BlacklistKind" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_object_key" ON "Blacklist"("object");

-- CreateIndex
CREATE INDEX "Blacklist_object_idx" ON "Blacklist"("object");

-- CreateIndex
CREATE INDEX "Blacklist_kind_idx" ON "Blacklist"("kind");
