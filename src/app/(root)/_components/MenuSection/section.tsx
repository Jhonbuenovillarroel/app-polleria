import { image, product, productCategory } from "@prisma/client";
import React from "react";
import { ShoppingBasket } from "lucide-react";
import MenuItem from "../MenuItem/menu-item";

interface Props {
  products: (product & { categories: productCategory[]; images: image[] })[];
}

const MenuSection = ({ products }: Props) => {
  return (
    <section className="pt-12 pb-20 flex flex-col gap-12">
      <h2 className="text-center text-3xl font-semibold">Nuestros Productos</h2>

      {!!products.length ? (
        <div className="grid grid-cols-3 gap-12 max-w-[900px] mx-auto">
          {products.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <ShoppingBasket className="w-5 h-5" strokeWidth={1.5} />
          <p className="w-full max-w-[280px]">No hay productos disponibles</p>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
