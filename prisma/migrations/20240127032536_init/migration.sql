-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "palworld";

-- CreateEnum
CREATE TYPE "palworld"."palTypesEnum" AS ENUM ('Dark', 'Dragon', 'Electric', 'Fire', 'Grass', 'Ground', 'Ice', 'Neutral', 'Water');

-- CreateTable
CREATE TABLE "palworld"."workSustainability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "workSustainability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."PalWorkSustainability" (
    "id" SERIAL NOT NULL,
    "palId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "workSustainabilityId" INTEGER NOT NULL,

    CONSTRAINT "PalWorkSustainability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."Pal" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL DEFAULT '0001',
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lore" TEXT NOT NULL,
    "food" INTEGER NOT NULL,
    "type_1" "palworld"."palTypesEnum" NOT NULL,
    "type_2" "palworld"."palTypesEnum",
    "partnerSkillId" INTEGER NOT NULL,

    CONSTRAINT "Pal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."PartnerSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PartnerSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "element" "palworld"."palTypesEnum" NOT NULL,
    "ct" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."SkillPal" (
    "id" SERIAL NOT NULL,
    "palId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "SkillPal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palworld"."DroppedItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "palId" INTEGER NOT NULL,

    CONSTRAINT "DroppedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pal_number_key" ON "palworld"."Pal"("number");

-- AddForeignKey
ALTER TABLE "palworld"."PalWorkSustainability" ADD CONSTRAINT "PalWorkSustainability_palId_fkey" FOREIGN KEY ("palId") REFERENCES "palworld"."Pal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."PalWorkSustainability" ADD CONSTRAINT "PalWorkSustainability_workSustainabilityId_fkey" FOREIGN KEY ("workSustainabilityId") REFERENCES "palworld"."workSustainability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."Pal" ADD CONSTRAINT "Pal_partnerSkillId_fkey" FOREIGN KEY ("partnerSkillId") REFERENCES "palworld"."PartnerSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."SkillPal" ADD CONSTRAINT "SkillPal_palId_fkey" FOREIGN KEY ("palId") REFERENCES "palworld"."Pal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."SkillPal" ADD CONSTRAINT "SkillPal_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "palworld"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."DroppedItem" ADD CONSTRAINT "DroppedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "palworld"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palworld"."DroppedItem" ADD CONSTRAINT "DroppedItem_palId_fkey" FOREIGN KEY ("palId") REFERENCES "palworld"."Pal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
