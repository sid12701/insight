-- AlterTable
ALTER TABLE "Journal" ADD COLUMN "temp_date" TIMESTAMP(3);

-- Update the temp_date column with converted values
UPDATE "Journal" SET "temp_date" = TO_TIMESTAMP("date", 'Month DD, YYYY');

-- Drop the old date column
ALTER TABLE "Journal" DROP COLUMN "date";

-- Rename the temp_date column to date
ALTER TABLE "Journal" RENAME COLUMN "temp_date" TO "date";

-- Make the date column required
ALTER TABLE "Journal" ALTER COLUMN "date" SET NOT NULL;
