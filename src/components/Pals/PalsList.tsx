"use client";
import { Pal, palTypesEnum } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MdClear } from "react-icons/md";
import dynamic from "next/dynamic";
import useIsInViewport from "@/utils/hooks/useIsInViewport";
import useIsInViewPort from "@/utils/hooks/useIsInViewport";

const PalAvatar = dynamic(() => import("./PalAvatar"));

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
      <div
        className="flex w-full gap-5 
        justify-center items-center mx-auto p-4
        "
      >
        <input
          type="text"
          placeholder="Search Pal"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          aria-label="Filter by Element"
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
          className="btn btn-primary w-32 hidden sm:block"
          onClick={() => {
            setSearch("");
            setType("");
          }}
        >
          Clear
        </button>

        <button
          className="btn btn-primary block sm:hidden"
          aria-label="Clear"
          onClick={() => {
            setSearch("");
            setType("");
          }}
        >
          <MdClear />
        </button>
      </div>
      <div className="flex flex-wrap min-h-screen flex-row justify-center items-center mx-auto p-4 gap-1">
        {filteredPals.map((pal, index) => (
          <PalCard key={pal.id} pal={pal} index={index} />
        ))}
      </div>
    </>
  );
};

const PalCard = ({ pal, index }: { pal: Pal; index: number }) => {
  const [targetRef, isInView] = useIsInViewPort({ threshold: 0.5 });

  return (
    <Link
      ref={targetRef as any}
      href={`/pal/${pal.id}`}
      className="w-full lg:w-1/4 xl:w-1/5 sm:w-1/4 xs:w-1/3
    flex flex-col gap-2 items-center justify-between border-2 border-gray-200 rounded-lg 
    m-4 p-4 min-h-80"
      aria-label={`More info about ${pal.name}`}
    >
      {isInView ? (
        <>
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
        </>
      ) : null}
    </Link>
  );
};

export default PalsList;
