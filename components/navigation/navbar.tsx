import React from "react";
import { UserButton } from "@clerk/nextjs";

import Logo from "@/components/logo";
import { DarkMode } from "@/components/theme-toggle";
import NavMenu from "@/components/navigation/nav-menu";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 min-h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <DarkMode />
        <NavMenu />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
