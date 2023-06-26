/*
  Warnings:

  - You are about to drop the column `name` on the `Climate` table. All the data in the column will be lost.
  - You are about to drop the column `rain` on the `Climate` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `Climate` table. All the data in the column will be lost.
  - You are about to drop the column `wind` on the `Climate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `Climate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humidity_max` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humidity_min` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rain_precipitation` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rain_probability` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature_max` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature_min` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wind_direction` to the `Climate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wind_velocity` to the `Climate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Climate" DROP COLUMN "name",
DROP COLUMN "rain",
DROP COLUMN "temperature",
DROP COLUMN "wind",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "humidity_max" INTEGER NOT NULL,
ADD COLUMN     "humidity_min" INTEGER NOT NULL,
ADD COLUMN     "rain_precipitation" INTEGER NOT NULL,
ADD COLUMN     "rain_probability" INTEGER NOT NULL,
ADD COLUMN     "temperature_max" INTEGER NOT NULL,
ADD COLUMN     "temperature_min" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "wind_direction" TEXT NOT NULL,
ADD COLUMN     "wind_velocity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Climate_date_key" ON "Climate"("date");
