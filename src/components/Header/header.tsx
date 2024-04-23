import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./_components/Navbar/navbar";

const Header = () => {
  return (
    <header className="px-8 py-4">
      <section className="flex items-center gap-6">
        <Link href={`/`} className="text-xl font-bold">
          Logo
        </Link>
        <Navbar />
      </section>
    </header>
  );
};

export default Header;
