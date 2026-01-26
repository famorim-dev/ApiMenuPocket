-- CreateTable
CREATE TABLE "ADMIN"."forgot_password" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "companie" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "update_password" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forgot_password_pkey" PRIMARY KEY ("id")
);
