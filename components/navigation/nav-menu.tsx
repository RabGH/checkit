"use client";

import React from "react";
import Link from "next/link";
import {
  BoxModelIcon,
  ListBulletIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border">
            <Pencil2Icon className="w-5 h-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2 flex flex-col">
            <NavigationMenuLink
              className="flex flex-col h-full w-full gap-2"
              asChild
            >
              <ul className="flex flex-row items-start justify-start">
                <Link href="/dashboard">
                  <Button variant={"outline"} className="gap-2">
                    <ListBulletIcon />
                    Todo
                  </Button>
                </Link>
                <Link href="/kanban">
                  <Button variant={"outline"} className="gap-2">
                    <BoxModelIcon />
                    Kanban
                  </Button>
                </Link>
              </ul>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
