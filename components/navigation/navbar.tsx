import { UserButton } from "@clerk/nextjs";
import React from "react";
import { DarkMode } from "@/components/theme-toggle";
import Logo from "@/components/logo";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 min-h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/" />
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
