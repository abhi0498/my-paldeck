"use client";
import { Pal, palTypesEnum } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import PalAvatar from "./PalAvatar";

const PalsList = ({ pals }: { pals: Pal[] }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const filteredPals = useMemo(() => {
    if (!search && !type) return pals;
    return pals
      .filter((pal) => pal.name.toLowerCase().includes(search.toLowerCase()))
      .filter((pal) => pal.type_1 === type || pal.type_2 === type);
  }, [search, pals, type]);

  return (
    <>
      <div className="flex w-full gap-5">
        <input
          type="text"
          placeholder="Search Pal"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value={""} disabled>
            Filter by Element
          </option>
          {Object.keys(palTypesEnum).map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary w-32"
          onClick={() => {
            setSearch("");
            setType("");
          }}
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap min-h-screen flex-row items-center mx-auto p-4 gap-1">
        {filteredPals.map((pal) => (
          <PalCard key={pal.id} pal={pal} />
        ))}
      </div>
    </>
  );
};

const PalCard = ({ pal }: { pal: Pal }) => {
  return (
    <div
      key={pal.id}
      className="w-full lg:w-1/4 xl:w-1/5 sm:w-1/3 flex flex-col gap-2 items-center justify-between border-2 border-gray-200 rounded-lg lg:m-4 lg:p-4"
    >
      <PalAvatar pal={pal} />
      <p className="font-bold">
        <strong>{pal.number} </strong>
        {pal.name}
      </p>
      <p>{pal?.title}</p>
      <p className="flex gap-5">
        <Image
          src={`/images/types/${pal.type_1}.png`}
          alt={pal.type_1}
          width={40}
          height={40}
          aria-label={pal.type_1}
          title={pal.type_1}
        />
        {pal.type_2 && (
          <Image
            src={`/images/types/${pal.type_2}.png`}
            alt={pal.type_2}
            width={40}
            height={40}
            aria-label={pal.type_2}
            title={pal.type_2}
          />
        )}
      </p>
    </div>
  );
};

export default PalsList;
