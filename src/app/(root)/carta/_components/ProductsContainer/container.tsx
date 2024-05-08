import MenuItem from "@/app/(root)/_components/MenuItem/menu-item";
import { Button } from "@/components/ui/button";
import { image, product, productCategory } from "@prisma/client";
import { Plus, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  products: (product & { categories: productCategory[]; images: image[] })[];
}

const ProductsContainer = ({ products }: Props) => {
  return (
    <div className="w-full px-4 sm:px-8">
      {!!products.length ? (
        <div className="w-full grid grid-cols-1 min-[450px]:grid-cols-2 min-[720px]:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {products.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 items-center justify-center text-sm w-full py-20">
            <ShoppingBasket className="w-6 h-6" strokeWidth={1.5} />
            <span>No hay productos disponibles</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsContainer;
