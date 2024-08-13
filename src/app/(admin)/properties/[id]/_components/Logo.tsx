"use client";

import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={130}
        height={32}
        priority
      />
    </div>
  );
};

export default Logo;
