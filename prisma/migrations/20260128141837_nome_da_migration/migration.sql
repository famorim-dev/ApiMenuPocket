-- CreateTable
CREATE TABLE "ADMIN"."restaurants" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "companie" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "photo" TEXT,
    "address" TEXT,
    "cnpj" TEXT,
    "telephone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "plan" TEXT,
    "city" TEXT,
    "website" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);
