import fs from "fs/promises";
import { prisma } from ".";
import palsData from "../pals.json";
async function main() {
  //   const workSustains = await createWorkSustains();

  //   const activeSkills = await createActiveSkills();

  //   const pals = await createPals();

  const images = await createImages();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createActiveSkills() {
  const activeSkills = await fs.readFile("./activeSkills.json", "utf-8");
  console.log(activeSkills);
  const parsedActiveSkills = JSON.parse(activeSkills);

  for (const skill of parsedActiveSkills) {
    const skillExists = await prisma.skill.count({
      where: {
        name: skill.name,
      },
    });
    if (!skillExists) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          element: skill.type,
          ct: skill.ct,
          power: skill.power,
          description: skill.description,
        },
      });
    }
  }
}

async function createPals() {
  for (const pal of palsData) {
    const partnerSkillData = pal.partnerSkill;

    const partnerSkillExists = await prisma.partnerSkill.count({
      where: {
        name: partnerSkillData?.name,
      },
    });

    if (!partnerSkillExists) {
      await prisma.partnerSkill.create({
        data: {
          name: partnerSkillData?.name!,
          description: partnerSkillData?.description!,
        },
      });
    }

    const palExists = await prisma.pal.count({
      where: {
        name: pal.name,
      },
    });

    if (!palExists) {
      await prisma.pal.create({
        data: {
          name: pal.name,
          title: pal.title! || "",
          lore: pal.lore,
          food: parseInt(pal.food) || 0,
          type_1: pal.type_1 as any,
          type_2: pal.type_2 as any,
          image: "",
          number: pal.number,
          skills: {
            createMany: {
              data: await Promise.all(
                pal.activeSkills.map(async (skill) => {
                  let skillF = await prisma.skill.findFirst({
                    where: {
                      name: skill.name,
                    },
                  });
                  if (!skillF) {
                    skillF = await prisma.skill.create({
                      data: {
                        name: skill.name,
                        element: null,
                        ct: "",
                        power: "",
                        description: "",
                      },
                    });
                  }
                  return {
                    level: parseInt(skill.level.replace("Level ", "")),
                    skillId: skillF?.id!,
                  };
                })
              ),
            },
          },
          partnerSkill: {
            connect: {
              name: pal.partnerSkill?.name!,
              id: (
                await prisma.partnerSkill.findFirst({
                  where: {
                    name: pal.partnerSkill?.name!,
                  },
                })
              )?.id,
            },
          },
        },
      });
    }
  }
}
async function createWorkSustains() {
  return await prisma.workSustainability.createMany({
    data: [
      {
        name: "Kindling",
      },
      {
        name: "Watering",
      },
      {
        name: "Planting",
      },
      {
        name: "Generating Electricity",
      },
      {
        name: "Handiwork",
      },
      {
        name: "Gathering",
      },
      {
        name: "Lumbering",
      },
      {
        name: "Mining",
      },
      {
        name: "Medicine Production",
      },
      {
        name: "Cooling",
      },
      {
        name: "Transporting",
      },
      {
        name: "Farming",
      },
    ],
  });
}

async function createImages() {}
