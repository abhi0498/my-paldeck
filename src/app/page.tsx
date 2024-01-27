import PalsList from "@/components/Pals/PalsList";
import { getAllPals } from "@/services/pals";
import Image from "next/image";
import { useState } from "react";

export default async function Home() {
  const pals = await getAllPals();

  return (
    <main className="min-h-screen mx-auto p-4">
      <PalsList pals={pals} />
    </main>
  );
}
