"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>CheckIt - Todo App</h1>
        <div className="h-[60px] text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Forget Stuff?",
                "Just CheckIt.",
                "Need Reminding?",
                "Add it, Check It.",
                "Stay Organized.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-red-700 dark:text-zinc-400">
        CheckIt
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start your Todos
          </Button>
        </Link>
      </div>
    </div>
  );
};
