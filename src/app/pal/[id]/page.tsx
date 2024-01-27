import { getPalById } from "@/services/pals";
import React from "react";

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
      <p>{pal?.name}</p>
    </main>
  );
};

export default Page;
