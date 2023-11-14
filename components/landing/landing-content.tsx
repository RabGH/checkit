"use client";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export const LandingContent = () => {
  return (
    <div className="px-5 pb-10">
      <div className="text-center mb-10 flex flex-col gap-6 items-center justify-center">
        <div>
          <h2 className="text-3xl text-white font-bold mb-2">
            Todo Board Application
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-normal">
            Still in Alpha.
          </p>
        </div>
        <Separator className="w-1/2" />
        <div>
          <h2 className="text-3xl text-white font-bold mb-2">
            Kanban Board Application
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-normal">
            Still in Alpha.
          </p>
        </div>

        {/* <div className="flex justify-center mt-10">
          <Image
            src="/collection-showcase.png"
            alt="checkit"
            width={1000}
            height={800}
            className="rounded-[2%]"
          />
        </div> */}
      </div>
    </div>
  );
};
