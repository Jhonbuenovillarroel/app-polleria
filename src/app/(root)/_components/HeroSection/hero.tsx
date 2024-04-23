import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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

        <div className="flex gap-3">
          <Button
            variant={"orangeButton"}
            size={"orangeButton"}
            className="flex items-center gap-1"
          >
            <span>Ver productos</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant={"orangeOutline"}
            size={"orangeButton"}
            className="flex items-center gap-1"
          >
            <span>Explorar menú</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
