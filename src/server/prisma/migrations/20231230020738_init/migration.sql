-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "startDate" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modelNumber" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "solarCellType" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolarPanel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingSolarPanel" (
    "buildingId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "solarPanelCount" INTEGER NOT NULL,
    "installedAt" TEXT NOT NULL,

    CONSTRAINT "BuildingSolarPanel_pkey" PRIMARY KEY ("buildingId","solarPanelId")
);

-- CreateTable
CREATE TABLE "_BuildingToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BuildingToProject_AB_unique" ON "_BuildingToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildingToProject_B_index" ON "_BuildingToProject"("B");

-- AddForeignKey
ALTER TABLE "BuildingSolarPanel" ADD CONSTRAINT "BuildingSolarPanel_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingSolarPanel" ADD CONSTRAINT "BuildingSolarPanel_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingToProject" ADD CONSTRAINT "_BuildingToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingToProject" ADD CONSTRAINT "_BuildingToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
