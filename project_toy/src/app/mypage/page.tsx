import Image from "next/image";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <Image
        src="/construction.png"
        width={500}
        height={600}
        alt="construction"
      />
      <h1>공사중입니다</h1>
    </div>
  );
}

export default page;
