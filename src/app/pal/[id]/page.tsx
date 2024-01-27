import FoodIcon from "@/components/Pals/FoodIcon";
import PalAvatar from "@/components/Pals/PalAvatar";
import { getPalById } from "@/services/pals";
import Image from "next/image";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const pal = await getPalById(+id);
  return {
    title: `${pal?.number} ${pal?.name} | PalDeck`,
    description: pal?.lore,
    tags: [
      "PalDeck",
      "Pal",
      "PalWorld",
      "Pals",
      pal?.name,
      pal?.number,
      pal?.type_1,
      pal?.type_2,
      pal?.partnerSkill?.name,
      ...(pal?.skills || [])?.map((skill) => skill.skill.name),
    ],
    openGraph: {
      images: [`/images/pals/${pal?.number}.png`],
    },
  };
}

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const pal = await getPalById(+id);
  console.log(pal);

  return (
    <main className="min-h-screen mx-auto p-4">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <PalAvatar
          pal={pal as any}
          size={300}
          className="rounded-full border-8 border-gray-200"
        />

        <h1 className="text-4xl font-bold text-center">
          <strong>{pal?.number} </strong>
          {pal?.name}
        </h1>

        <p className="text-xl">{pal?.title}</p>

        <div className="flex gap-5">
          <div className="flex gap-2 items-center justify-center">
            <Image
              src={`/images/types/${pal?.type_1}.png`}
              alt={pal?.type_1!}
              width={40}
              height={40}
              aria-label={pal?.type_1}
              title={pal?.type_1}
            />
            {pal?.type_1}
          </div>
          {pal?.type_2 && (
            <div className="flex gap-2 items-center justify-center">
              <Image
                src={`/images/types/${pal?.type_2}.png`}
                alt={pal?.type_2}
                width={40}
                height={40}
                aria-label={pal?.type_2}
                title={pal?.type_2}
              />
              {pal?.type_2}
            </div>
          )}
        </div>

        <hr className="w-full mt-4 mb-2" />
        <p className="text-xl text-justify">{pal?.lore}</p>

        <hr className="w-full mt-4 mb-2" />
        <section className="w-full">
          <h2 className="text-2xl font-extrabold ">Partner Skill</h2>
          <p className="text-xl font-bold my-2 text-justify">
            {pal?.partnerSkill?.name}
          </p>
          <p className="text-lg text-justify">
            {pal?.partnerSkill?.description}
          </p>
        </section>

        <hr className="w-full mt-4 mb-2" />
        <section className="w-full">
          <h2 className="text-2xl font-extrabold mb-2">Food</h2>

          <div className="flex flex-wrap gap-2 items-center">
            {Array.from({ length: +(pal?.food || 0) }).map((e, i) => (
              <FoodIcon key={i} />
            ))}
          </div>
        </section>

        <hr className="w-full mt-4 mb-2" />

        <section className="w-full">
          <h2 className="text-2xl font-extrabold mb-2">Skills</h2>

          <div className="flex flex-wrap flex-col gap-2">
            {pal?.skills?.map((skill) => (
              <div key={skill.level} className="flex flex-col gap-2">
                <p className="text-xl font-bold my-2 text-justify">
                  Level {skill.level} {" - "} {skill.skill.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
