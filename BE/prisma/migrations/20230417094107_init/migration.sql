-- CreateTable
CREATE TABLE "nomi" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "nomi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colore" (
    "id" SERIAL NOT NULL,
    "colore" VARCHAR(255) NOT NULL,

    CONSTRAINT "colore_pkey" PRIMARY KEY ("id")
);
