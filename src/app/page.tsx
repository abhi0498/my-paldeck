// import PalsList from "@/components/Pals/PalsList";
import { getAllPals } from "@/services/pals";
import dynamic from "next/dynamic";

const PalsList = dynamic(() => import("@/components/Pals/PalsList"));

export default async function Home() {
  const pals = await getAllPals();

  return (
    <main className="min-h-screen mx-auto p-4">
      <PalsList pals={pals} />
    </main>
  );
}
