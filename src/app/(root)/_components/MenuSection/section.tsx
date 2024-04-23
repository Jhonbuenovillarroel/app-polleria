import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const MenuSection = () => {
  return (
    <section className="pt-12 pb-20 flex flex-col gap-12">
      <h2 className="text-center text-3xl font-semibold">Nuestros Productos</h2>

      <div className="grid grid-cols-3 gap-12 max-w-[1500px] mx-auto">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
};

export default MenuSection;

const Product = () => {
  return (
    <div className="w-full flex flex-col gap-4 px-8 min-w-[280px] py-6 rounded-md shadow-xl">
      <Image
        className="rounded-full w-40 mx-auto"
        src={`/images/menu/menu-dish.jpg`}
        width={400}
        height={400}
        alt="plato del menu"
      />
      <div className="flex flex-col gap-1">
        <h4 className="font-medium">Pollo Broaster</h4>
        <p className="font-bold">S/ 14.00</p>
        <div className="mt-3">
          <Button
            variant={"orangeButton"}
            className="flex items-center gap-2 text-zinc-100 hover:text-orange-500 hover:bg-transparent"
          >
            <span>Añadir al carrito</span>
            <Plus className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
};
