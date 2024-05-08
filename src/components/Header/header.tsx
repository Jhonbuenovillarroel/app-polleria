"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./_components/Navbar/navbar";
import ToggleThemeButton from "../(theme)/ToggleThemeButton/toggle-theme-button";
import ShoppingCart from "./_components/ShoppingCart/shopping-cart";
import Logo from "../(theme)/Logo/logo";

const Header = () => {
  return (
    <header className="px-4 sm:px-8 py-2 flex justify-between h-[64px]">
      <section className="flex items-center gap-4 sm:gap-6">
        <Link href={`/`} className="text-xl font-bold">
          <Logo className="w-10" />
        </Link>
        <Navbar />
      </section>
      <section className="flex items-center gap-4">
        <ShoppingCart />
        <ToggleThemeButton />
      </section>
    </header>
  );
};

export default Header;
