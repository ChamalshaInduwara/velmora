-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[];
