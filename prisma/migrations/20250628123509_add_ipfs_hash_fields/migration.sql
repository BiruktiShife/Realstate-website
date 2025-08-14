-- AlterTable
ALTER TABLE "companies" ADD COLUMN "coverImageIpfsHash" TEXT;
ALTER TABLE "companies" ADD COLUMN "logoIpfsHash" TEXT;

-- AlterTable
ALTER TABLE "property_images" ADD COLUMN "ipfsHash" TEXT;
