-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "MENU";

-- CreateTable
CREATE TABLE "MENU"."items" (
    "id" TEXT NOT NULL,
    "id_restaurants" TEXT NOT NULL,
    "name_restaurants" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "promotion" BOOLEAN NOT NULL DEFAULT false,
    "value_promotion" TEXT,
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);
