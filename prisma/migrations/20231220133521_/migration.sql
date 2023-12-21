/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GlobalTransactionLedgerType" AS ENUM ('LOCALBANKTRANSFER', 'INTERBANKTRANSFER');

-- CreateEnum
CREATE TYPE "GlobalTransactionLedgerStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('APPZONE', 'NIBSS');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('NOT_VERIFIED', 'PENDING', 'APPROVED', 'DECLINED');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'DECLINED', 'BLOCKED', 'LOCKED');

-- CreateEnum
CREATE TYPE "IdentificationCardType" AS ENUM ('DRIVERS_LICENSE', 'INTERNATIONAL_PASSPORT', 'NATIONAL_ID', 'VOTERS_CARD');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'USD', 'GBP', 'EUR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'REFUND', 'TRANSFER', 'BILL_PAYMENT', 'CARD_REQUEST');

-- CreateEnum
CREATE TYPE "BusinessSetupStage" AS ENUM ('OTP_VERIFICATION', 'BVN_VERIFICATION', 'FACE_VERIFICATION', 'PIN_SETUP', 'PROFILE_SETUP', 'OWNER_ID_VERIFICATION', 'BUSINESS_ID_VERIFICATION', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_userId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_userId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_borrowerId_fkey";

-- DropForeignKey
ALTER TABLE "LoanCycle" DROP CONSTRAINT "LoanCycle_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "api_keys" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "staff_pk" INTEGER,
    "staff_id" UUID,
    "workspace_pk" INTEGER,
    "workspace_id" UUID,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "users" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "deviceData" JSONB,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "profiles" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "photo" TEXT,
    "dob" TIMESTAMP(3),
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT NOT NULL,
    "affliation_code" TEXT NOT NULL,
    "referrer_pk" INTEGER,
    "referrer_id" UUID,
    "personal_pin" TEXT,
    "user_pk" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "home_address" TEXT,
    "comono_request_id" TEXT,
    "lga" TEXT,
    "state" TEXT,
    "city" TEXT,
    "closest_landmark" TEXT,
    "idFront" TEXT,
    "idBack" TEXT,
    "bvn" TEXT,
    "id_type" "IdentificationCardType",
    "id_number" TEXT,
    "address_document" TEXT,
    "bvn_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "id_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "address_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "digital_address_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "face_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "next_of_kin" TEXT,
    "marital_status" TEXT,
    "device_token" TEXT,
    "rawBvnData" JSONB,
    "rawIdData" JSONB,
    "rawAddressData" JSONB,
    "rawDigitalAddressData" JSONB,
    "rawFaceData" JSONB,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "images" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "account_tiers" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "daily_withdrawal_limit" DOUBLE PRECISION NOT NULL,
    "daily_transfer_limit" DOUBLE PRECISION NOT NULL,
    "daily_deposit_limit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "account_tiers_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "transaction_tracking_ref" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "tier_pk" INTEGER NOT NULL,
    "tier_id" UUID NOT NULL,
    "account_number" TEXT NOT NULL,
    "profile_pk" INTEGER NOT NULL,
    "profile_id" UUID NOT NULL,
    "pnd" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "virtual_cards" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "cardNumber" TEXT,
    "expiryDate" TEXT,
    "cvv" TEXT,
    "bank_account_pk" INTEGER NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "maximum_daily_limit" DOUBLE PRECISION,
    "maximum_daily_withdrawal" DOUBLE PRECISION,
    "status" "CardStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "virtual_cards_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "physical_cards" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "closestLandmark" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "cardNumber" TEXT,
    "expiryDate" TEXT,
    "cvv" TEXT,
    "bank_account_pk" INTEGER NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "maximum_daily_limit" DOUBLE PRECISION,
    "maximum_daily_withdrawal" DOUBLE PRECISION,
    "status" "CardStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "physical_cards_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "global_transaction_ledger" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "providerRef" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "GlobalTransactionLedgerType" NOT NULL,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'APPZONE',
    "status" "GlobalTransactionLedgerStatus" NOT NULL,
    "data" JSONB NOT NULL,
    "response" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "global_transaction_ledger_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "transactions" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bank_pk" INTEGER,
    "bank_id" UUID,
    "virtual_card_pk" INTEGER,
    "virtual_card_id" UUID,
    "physical_card_pk" INTEGER,
    "physical_card_id" UUID,
    "type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender" TEXT,
    "senderName" TEXT,
    "recipient" TEXT,
    "recipientName" TEXT,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "global_transaction_log_pk" INTEGER,
    "global_transaction_log_id" UUID,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "webhook_url" TEXT,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "workspace_accounts" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "transaction_tracking_ref" TEXT NOT NULL,
    "account_opening_tracking_ref" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "workspace_pk" INTEGER NOT NULL,
    "workspace_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "attached" BOOLEAN NOT NULL DEFAULT false,
    "attached_at" TIMESTAMP(3),
    "attached_to" TEXT,

    CONSTRAINT "workspace_accounts_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "workspace_user_accounts" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "transaction_tracking_ref" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "customer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bvn" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "workspace_pk" INTEGER NOT NULL,
    "workspace_id" UUID NOT NULL,

    CONSTRAINT "workspace_user_accounts_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "workspace_mandates" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "cid" TEXT NOT NULL,
    "workspace_pk" INTEGER NOT NULL,
    "workspace_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "accountName" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "bank_code" TEXT NOT NULL,
    "payer_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "subscriber_code" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "interval" INTEGER NOT NULL,

    CONSTRAINT "workspace_mandates_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "workspace_transactions" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bank_pk" INTEGER,
    "bank_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uref" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "recipient" TEXT,
    "recipientName" TEXT,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "global_transaction_log_pk" INTEGER,
    "global_transaction_log_id" UUID,
    "mandate_pk" INTEGER,
    "mandate_id" UUID,

    CONSTRAINT "workspace_transactions_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "webhook_events" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "event" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_pk" INTEGER NOT NULL,
    "workspace_id" UUID NOT NULL,

    CONSTRAINT "webhook_events_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "business_users" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pin" TEXT,
    "deviceToken" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "reg_stage" "BusinessSetupStage" NOT NULL DEFAULT 'OTP_VERIFICATION',

    CONSTRAINT "business_users_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "business_profiles" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "photo" TEXT,
    "dob" TIMESTAMP(3),
    "first_name" TEXT,
    "middle_name" TEXT,
    "surname" TEXT,
    "gender" "Gender",
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "lga" TEXT,
    "user_pk" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "business_profiles_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "business_kyc" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "bvn" TEXT,
    "id_type" "IdentificationCardType",
    "id_number" TEXT,
    "id_image_url" TEXT,
    "cac_number" TEXT,
    "cac_image_url" TEXT,
    "cac_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "bvn_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "id_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "face_verified" "VerificationStatus" NOT NULL DEFAULT 'NOT_VERIFIED',
    "rawBvnData" JSONB,
    "rawIdData" JSONB,
    "rawFaceData" JSONB,
    "rawCacData" JSONB,
    "business_pk" INTEGER NOT NULL,
    "business_id" UUID NOT NULL,

    CONSTRAINT "business_kyc_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "business_stores" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_address" TEXT,
    "business_city" TEXT,
    "business_state" TEXT,
    "business_country" TEXT,
    "business_zip_code" TEXT,
    "business_currency" "Currency",
    "business_registration_number" TEXT,
    "business_registration_image" TEXT,
    "business_registration_number_verification_data" JSONB,
    "logo" TEXT,
    "tagline" TEXT,
    "description" TEXT,
    "banner" TEXT,
    "business_pk" INTEGER NOT NULL,
    "business_id" UUID NOT NULL,

    CONSTRAINT "business_stores_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_id_key" ON "api_keys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_key_key" ON "api_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_workspace_pk_workspace_id_key" ON "api_keys"("workspace_pk", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_pk_id_key" ON "api_keys"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_pk_id_key" ON "users"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_affliation_code_key" ON "profiles"("affliation_code");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_pk_key" ON "profiles"("user_pk");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_comono_request_id_key" ON "profiles"("comono_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_pk_id_key" ON "profiles"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_pk_user_id_key" ON "profiles"("user_pk", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_pk_id_key" ON "images"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "account_tiers_id_key" ON "account_tiers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "account_tiers_ref_key" ON "account_tiers"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "account_tiers_name_key" ON "account_tiers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "account_tiers_pk_id_key" ON "account_tiers"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_id_key" ON "bank_accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_transaction_tracking_ref_key" ON "bank_accounts"("transaction_tracking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_customer_id_key" ON "bank_accounts"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_pk_id_key" ON "bank_accounts"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_profile_pk_profile_id_key" ON "bank_accounts"("profile_pk", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "virtual_cards_id_key" ON "virtual_cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "virtual_cards_pk_id_key" ON "virtual_cards"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "virtual_cards_bank_account_pk_bank_account_id_key" ON "virtual_cards"("bank_account_pk", "bank_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_cards_id_key" ON "physical_cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_cards_pk_id_key" ON "physical_cards"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_cards_bank_account_pk_bank_account_id_key" ON "physical_cards"("bank_account_pk", "bank_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "global_transaction_ledger_id_key" ON "global_transaction_ledger"("id");

-- CreateIndex
CREATE UNIQUE INDEX "global_transaction_ledger_reference_key" ON "global_transaction_ledger"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "global_transaction_ledger_providerRef_key" ON "global_transaction_ledger"("providerRef");

-- CreateIndex
CREATE UNIQUE INDEX "global_transaction_ledger_pk_id_key" ON "global_transaction_ledger"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_pk_id_key" ON "transactions"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_id_key" ON "workspaces"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_customerId_key" ON "workspaces"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_pk_id_key" ON "workspaces"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_accounts_id_key" ON "workspace_accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_accounts_transaction_tracking_ref_key" ON "workspace_accounts"("transaction_tracking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_accounts_account_opening_tracking_ref_key" ON "workspace_accounts"("account_opening_tracking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_accounts_account_number_key" ON "workspace_accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_accounts_pk_id_key" ON "workspace_accounts"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_id_key" ON "workspace_user_accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_transaction_tracking_ref_key" ON "workspace_user_accounts"("transaction_tracking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_account_number_key" ON "workspace_user_accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_customer_id_key" ON "workspace_user_accounts"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_bvn_key" ON "workspace_user_accounts"("bvn");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_workspace_id_key" ON "workspace_user_accounts"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_user_accounts_pk_id_key" ON "workspace_user_accounts"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_mandates_id_key" ON "workspace_mandates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_mandates_code_key" ON "workspace_mandates"("code");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_mandates_pk_id_key" ON "workspace_mandates"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_transactions_id_key" ON "workspace_transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_transactions_uref_key" ON "workspace_transactions"("uref");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_transactions_pk_id_key" ON "workspace_transactions"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_transactions_global_transaction_log_pk_global_tra_key" ON "workspace_transactions"("global_transaction_log_pk", "global_transaction_log_id");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_id_key" ON "webhook_events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_pk_id_key" ON "webhook_events"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_id_key" ON "business_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_email_key" ON "business_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_phone_key" ON "business_users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_pk_id_key" ON "business_users"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_id_key" ON "business_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_user_pk_key" ON "business_profiles"("user_pk");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_user_id_key" ON "business_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_pk_id_key" ON "business_profiles"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "business_profiles_user_pk_user_id_key" ON "business_profiles"("user_pk", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_kyc_id_key" ON "business_kyc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_kyc_pk_id_key" ON "business_kyc"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "business_kyc_business_pk_business_id_key" ON "business_kyc"("business_pk", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_stores_id_key" ON "business_stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_stores_pk_id_key" ON "business_stores"("pk", "id");

-- CreateIndex
CREATE UNIQUE INDEX "business_stores_business_pk_business_id_key" ON "business_stores"("business_pk", "business_id");

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_staff_pk_staff_id_fkey" FOREIGN KEY ("staff_pk", "staff_id") REFERENCES "users"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_workspace_pk_workspace_id_fkey" FOREIGN KEY ("workspace_pk", "workspace_id") REFERENCES "workspaces"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_referrer_pk_referrer_id_fkey" FOREIGN KEY ("referrer_pk", "referrer_id") REFERENCES "profiles"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_pk_user_id_fkey" FOREIGN KEY ("user_pk", "user_id") REFERENCES "users"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_tier_pk_tier_id_fkey" FOREIGN KEY ("tier_pk", "tier_id") REFERENCES "account_tiers"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_profile_pk_profile_id_fkey" FOREIGN KEY ("profile_pk", "profile_id") REFERENCES "profiles"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "virtual_cards" ADD CONSTRAINT "virtual_cards_bank_account_pk_bank_account_id_fkey" FOREIGN KEY ("bank_account_pk", "bank_account_id") REFERENCES "bank_accounts"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_cards" ADD CONSTRAINT "physical_cards_bank_account_pk_bank_account_id_fkey" FOREIGN KEY ("bank_account_pk", "bank_account_id") REFERENCES "bank_accounts"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanCycle" ADD CONSTRAINT "LoanCycle_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bank_pk_bank_id_fkey" FOREIGN KEY ("bank_pk", "bank_id") REFERENCES "bank_accounts"("pk", "id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_virtual_card_pk_virtual_card_id_fkey" FOREIGN KEY ("virtual_card_pk", "virtual_card_id") REFERENCES "virtual_cards"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_physical_card_pk_physical_card_id_fkey" FOREIGN KEY ("physical_card_pk", "physical_card_id") REFERENCES "physical_cards"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_global_transaction_log_pk_global_transaction__fkey" FOREIGN KEY ("global_transaction_log_pk", "global_transaction_log_id") REFERENCES "global_transaction_ledger"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_accounts" ADD CONSTRAINT "workspace_accounts_workspace_pk_workspace_id_fkey" FOREIGN KEY ("workspace_pk", "workspace_id") REFERENCES "workspaces"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_user_accounts" ADD CONSTRAINT "workspace_user_accounts_workspace_pk_workspace_id_fkey" FOREIGN KEY ("workspace_pk", "workspace_id") REFERENCES "workspaces"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_mandates" ADD CONSTRAINT "workspace_mandates_workspace_pk_workspace_id_fkey" FOREIGN KEY ("workspace_pk", "workspace_id") REFERENCES "workspaces"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_transactions" ADD CONSTRAINT "workspace_transactions_bank_pk_bank_id_fkey" FOREIGN KEY ("bank_pk", "bank_id") REFERENCES "workspaces"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_transactions" ADD CONSTRAINT "workspace_transactions_global_transaction_log_pk_global_tr_fkey" FOREIGN KEY ("global_transaction_log_pk", "global_transaction_log_id") REFERENCES "global_transaction_ledger"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_transactions" ADD CONSTRAINT "workspace_transactions_mandate_pk_mandate_id_fkey" FOREIGN KEY ("mandate_pk", "mandate_id") REFERENCES "workspace_mandates"("pk", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_workspace_pk_workspace_id_fkey" FOREIGN KEY ("workspace_pk", "workspace_id") REFERENCES "workspaces"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_profiles" ADD CONSTRAINT "business_profiles_user_pk_user_id_fkey" FOREIGN KEY ("user_pk", "user_id") REFERENCES "business_users"("pk", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_kyc" ADD CONSTRAINT "business_kyc_business_pk_business_id_fkey" FOREIGN KEY ("business_pk", "business_id") REFERENCES "business_users"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_stores" ADD CONSTRAINT "business_stores_business_pk_business_id_fkey" FOREIGN KEY ("business_pk", "business_id") REFERENCES "business_users"("pk", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
