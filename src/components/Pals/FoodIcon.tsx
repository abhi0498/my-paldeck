import Image from "next/image";
import React from "react";

const FoodIcon = () => {
  return (
    <Image
      src={`/images/food.webp`}
      alt="food"
      width={25}
      height={25}
      aria-label="food"
      title="food"
    />
  );
};

export default FoodIcon;
