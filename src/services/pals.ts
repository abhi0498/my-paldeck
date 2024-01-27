import { prisma } from "../../prisma";

export const getAllPals = async () => {
  return prisma.pal.findMany({
    include: {
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
    orderBy: { number: "asc" },
  });
};
