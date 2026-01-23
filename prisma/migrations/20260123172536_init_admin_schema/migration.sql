-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ADMIN";

-- CreateTable
CREATE TABLE "ADMIN"."user_companies" (
    "id" TEXT NOT NULL,
    "companie" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "photo" TEXT,
    "address" TEXT,
    "cnpj" TEXT,
    "telephone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "plan" TEXT,
    "city" TEXT,
    "website" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_companies_email_key" ON "ADMIN"."user_companies"("email");
