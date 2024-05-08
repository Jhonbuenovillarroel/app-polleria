"use client";

import {
  ShoppingCartProductType,
  useShoppingCartStore,
} from "@/store/shopping-cart-store";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  product: ShoppingCartProductType;
}

const OrderSummaryProduct = ({ product }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <div className="flex w-full items-center gap-5 relative px-6 py-5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200">
      <Image
        className="w-24 h-fit"
        src={!!product.images.length ? product.images[0].url : ""}
        width={200}
        height={200}
        alt={`Imagen del producto - ${product.name}`}
      />
      <div className="w-full max-w-[150px]">
        <p className="text-sm font-medium">{product.name}</p>
        <p className="font-semibold text-sm">S/ {product.price.toFixed(2)}</p>
        <div className="flex mt-2">
          <button
            className="w-6 bg-zinc-200 dark:bg-zinc-800"
            onClick={() => shoppingCartStore.decreaseProductUnits(product.id)}
          >
            -
          </button>
          <p className="w-8 flex items-center justify-center text-sm text-zinc-900 dark:text-zinc-100">
            {product.units}
          </p>
          <button
            className="w-6 bg-zinc-200 dark:bg-zinc-800"
            onClick={() => shoppingCartStore.increaseProductUnits(product.id)}
          >
            +
          </button>
        </div>
      </div>

      <div
        className="absolute cursor-pointer top-2 right-2 w-6 h-6 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-sm transition-all duration-200"
        onClick={() => {
          shoppingCartStore.removeProduct(product.id);
        }}
      >
        <X className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};

export default OrderSummaryProduct;
