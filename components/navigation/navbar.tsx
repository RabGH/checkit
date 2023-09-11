import { UserButton } from "@clerk/nextjs";
import React from "react";
import { DarkMode } from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav>
      <Logo />
      <div>
        <UserButton afterSignOutUrl="/" />
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
