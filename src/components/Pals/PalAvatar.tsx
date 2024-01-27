import { Pal } from "@prisma/client";
import Image from "next/image";
import React from "react";

const imageExists = async (path: string) => {
  try {
    const a = await import(`../../../public/images/pals/${path}.png`);
    console.log({
      a,
      path,
    });

    return true;
  } catch {
    return false;
  }
};

const PalAvatar = ({ pal }: { pal: Pal }) => {
  const [error, setError] = React.useState(false);
  if (error)
    return (
      <Image
        src={`/images/palworld.png`}
        alt={pal.name}
        className="rounded-full border-2 border-gray-200"
        width={200}
        height={200}
        style={{
          objectFit: "cover",
          width: "200px",
          height: "200px",
        }}
      />
    );
  return (
    <Image
      onError={() => setError(true)}
      onErrorCapture={() => setError(true)}
      src={`/images/pals/${pal.name}.png`}
      alt={pal.name}
      className="rounded-full border-2 border-gray-200"
      width={200}
      height={200}
      style={{
        objectFit: "cover",
        width: "200px",
        height: "200px",
      }}
    />
  );
};

export default PalAvatar;
