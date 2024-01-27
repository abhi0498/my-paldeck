import { prisma } from "../../prisma";

export const getAllPals = async () => {
  return prisma.pal.findMany({
    orderBy: { number: "asc" },
  });
};

export const getPalById = async (id: number) => {
  return prisma.pal.findUnique({
    where: { id },
    include: {
      partnerSkill: {
        select: { name: true, description: true },
      },
      droppedItems: {
        select: { item: true },
      },
      skills: {
        select: { level: true, skill: true },
      },
      workSustainability: {
        select: { workSustainability: true, level: true },
      },
    },
  });
};
