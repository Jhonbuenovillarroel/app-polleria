import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./_components/Navbar/navbar";
import ToggleThemeButton from "../(theme)/ToggleThemeButton/toggle-theme-button";
import ShoppingCart from "./_components/ShoppingCart/shopping-cart";

const Header = () => {
  return (
    <header className="px-8 py-2 flex justify-between">
      <section className="flex items-center gap-6">
        <Link href={`/`} className="text-xl font-bold">
          Logo
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
