"use client";

import Image from "next/image";

export const LandingContent = () => {
  return (
    <div className="px-5 pb-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-white font-extrabold mb-2">Dashboard</h2>
        <p className="text-zinc-400 text-xs md:text-sm font-normal">
          Still in Alpha.
        </p>
        <div className="flex justify-center mt-10">
          <Image
            src="/collection-showcase.png"
            alt="checkit"
            width={1000}
            height={800}
            className="rounded-[2%]"
          />
        </div>
      </div>
    </div>
  );
};
