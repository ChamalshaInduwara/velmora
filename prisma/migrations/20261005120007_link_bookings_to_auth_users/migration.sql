-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "accountUserId" TEXT;

-- CreateIndex
CREATE INDEX "Booking_accountUserId_idx" ON "Booking"("accountUserId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_accountUserId_fkey" FOREIGN KEY ("accountUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
