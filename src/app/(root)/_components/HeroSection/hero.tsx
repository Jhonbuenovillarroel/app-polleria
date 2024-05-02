import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-[320px] w-full flex items-center justify-center bg-[url('/images/hero/hero-image.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.65)]">
      <div className="relative z-[1] flex flex-col items-center gap-10">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-4xl text-zinc-100 font-bold">Pollería Paisita</h1>
          <p className="text-zinc-200">
            Sabor de casa, sólo con productos naturales y frescos
          </p>
        </div>

        <div className="flex gap-3 text-white">
          <Link
            href={`/carta`}
            className="flex items-center gap-1 px-6 text-sm bg-orange-500 rounded-full h-11"
          >
            <span>Ver productos</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/carta`}
            className="flex items-center gap-1 px-6 text-sm h-11 border border-orange-500 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all duration-200"
          >
            <span>Explorar menú</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
