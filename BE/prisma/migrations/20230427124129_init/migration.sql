/*
  Warnings:

  - You are about to drop the column `name` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `file` table. All the data in the column will be lost.
  - Added the required column `encoded_name` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "name",
DROP COLUMN "path",
ADD COLUMN     "encoded_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "original_name" VARCHAR(100) NOT NULL;
