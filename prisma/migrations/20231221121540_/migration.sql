/*
  Warnings:

  - You are about to drop the column `repaymentId` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "LoanStatus" ADD VALUE 'ACTIVE';

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "repaymentId";
