"use client";

import MenuItemButtonLoading from "@/components/(loading)/MenuItemButton/button";
import { Button } from "@/components/ui/button";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { image, product, productCategory } from "@prisma/client";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  product: product & { categories: productCategory[]; images: image[] };
}

const MenuItem = ({ product }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  const [addingProduct, setAddingProduct] = useState(false);

  return (
    <div className="w-full max-w-[280px] flex flex-col gap-6 px-8 py-6 rounded-md shadow-md">
      <Image
        className="rounded-full w-full max-w-[150px] mx-auto"
        src={`${!!product.images.length ? product.images[0].url : ""}`}
        width={400}
        height={400}
        alt="plato del menu"
      />
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">{product.name}</h4>
        <p className="text-sm font-bold">S/ {product.price.toFixed(2)}</p>
        <div className="mt-3">
          {addingProduct ? (
            <>
              <MenuItemButtonLoading />
            </>
          ) : (
            <>
              {shoppingCartStore.products.some(
                (shoppingCartProduct) => shoppingCartProduct.id === product.id
              ) ? (
                <>
                  <>
                    <Button
                      variant={"outline"}
                      className="flex gap-2 items-center pointer-events-none text-wrap"
                    >
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                      <span>Agregado al carrito</span>
                    </Button>
                  </>
                </>
              ) : (
                <>
                  <>
                    <Button
                      variant={"orangeButton"}
                      className="flex items-center gap-2 text-zinc-100 hover:text-orange-500 dark:hover:text-orange-300 dark:hover:border-orange-300 hover:bg-transparent"
                      onClick={() => {
                        setAddingProduct(true);

                        setTimeout(() => {
                          shoppingCartStore.addProduct({
                            ...product,
                            units: 1,
                          });
                          setAddingProduct(false);
                          shoppingCartStore.shoppingCartIsOpen(true);
                        }, 1000);
                      }}
                    >
                      <span>Añadir al carrito</span>
                      <Plus className="w-4 h-4" strokeWidth={2} />
                    </Button>
                  </>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
