"use client";

import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { image, orderedProduct, product } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  orderedProduct: orderedProduct & { product: product & { images: image[] } };
}

const OrderedProduct = ({ orderedProduct }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <div className="w-full max-w-[320px] flex items-center gap-5 relative px-6 py-5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200">
      <Image
        className="w-24 h-fit"
        src={
          !!orderedProduct.product.images.length
            ? orderedProduct.product.images[0].url
            : ""
        }
        width={200}
        height={200}
        alt={`Imagen del producto - ${orderedProduct.product.name}`}
      />
      <div className="">
        <p className="text-sm font-medium">{orderedProduct.product.name}</p>
        <p className="font-semibold text-sm">
          S/ {orderedProduct.product.price.toFixed(2)}
        </p>
        <div className="flex mt-2">
          <p className="w-full flex gap-2 items-center justify-start text-sm text-zinc-900 dark:text-zinc-100">
            <span className="text-sm font-medium text-zinc-400">Unidades:</span>
            <span>{orderedProduct.units}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderedProduct;
