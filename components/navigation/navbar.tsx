import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import Logo from "@/components/logo";
import { DarkMode } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 min-h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/" />
        <DarkMode />
        <Link href="/kanban">
          <Button variant="outline" size="icon">
            <Pencil2Icon className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
