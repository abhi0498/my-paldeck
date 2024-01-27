"use client";
import { Pal } from "@prisma/client";
import Image, { ImageProps } from "next/image";
import React from "react";

const PalAvatar = ({
  pal,
  size = 200,
  ...props
}: { pal: Pal; size?: number } & Omit<ImageProps, "src" | "alt">) => {
  const [error, setError] = React.useState(false);
  if (error)
    return (
      <Image
        src={`/images/palworld.png`}
        alt={pal.name}
        className="rounded-full border-2 border-gray-200"
        width={size}
        height={size}
        style={{
          objectFit: "cover",
          width: `${size}px`,
          height: `${size}px`,
        }}
        {...props}
      />
    );
  return (
    <Image
      priority
      onError={() => setError(true)}
      onErrorCapture={() => setError(true)}
      src={`/images/pals/${pal.name}.png`}
      alt={pal.name}
      className="rounded-full border-2 border-gray-200"
      width={size}
      height={size}
      style={{
        objectFit: "cover",
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...props}
    />
  );
};

export default PalAvatar;
