"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <>
      <div className="flex sm:hidden">
        <Sheet onOpenChange={setShowNavBar} open={showNavBar}>
          <SheetTrigger>
            <Menu className="w-5 h-5" />
          </SheetTrigger>

          <SheetContent side={"top"} className="border-none min-h-screen">
            <div className="min-h-screen flex items-center justify-center">
              <NavBarLink href="/" title="Home" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList className="text-sm">
          <NavigationMenuItem>
            <Link href={"/"} className="font-medium">
              Home
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navbar;

interface NavBarLinkProps {
  href: string;
  title: string;
  className?: string;
}
const NavBarLink = ({ href, title, className }: NavBarLinkProps) => {
  return (
    <Link href={href} className="">
      {title}
    </Link>
  );
};
