-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "votedForId" INTEGER NOT NULL,
    "votedAgainstId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "averageRent" INTEGER NOT NULL,
    "walkScore" INTEGER NOT NULL,
    "transitScore" INTEGER NOT NULL,
    "bikeScore" INTEGER NOT NULL,
    "nonViolentCrime" DOUBLE PRECISION NOT NULL,
    "violentCrime" DOUBLE PRECISION NOT NULL,
    "crimePercentile" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vote_votedForId_idx" ON "Vote"("votedForId");

-- CreateIndex
CREATE INDEX "Vote_votedAgainstId_idx" ON "Vote"("votedAgainstId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votedAgainstId_fkey" FOREIGN KEY ("votedAgainstId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
