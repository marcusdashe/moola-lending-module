/*
  Warnings:

  - You are about to drop the `Repayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Repayment" DROP CONSTRAINT "Repayment_loanId_fkey";

-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Repayment";
