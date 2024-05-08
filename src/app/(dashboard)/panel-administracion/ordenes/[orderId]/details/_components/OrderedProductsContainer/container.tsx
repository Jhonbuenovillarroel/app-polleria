"use client";

import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import OrderedProduct from "../OrderedProduct/ordered-product";
import { image, orderedProduct, product } from "@prisma/client";

interface Props {
  orderedProducts: (orderedProduct & {
    product: product & { images: image[] };
  })[];
}

const OrderedProductsContainer = ({ orderedProducts }: Props) => {
  return (
    <div className="mt-4 w-full flex items-center justify-center">
      {!!orderedProducts.length ? (
        <div className="w-full flex flex-col gap-8 items-center justify-center py-12">
          <div className="flex flex-col gap-2 w-full items-center">
            {orderedProducts.map((product) => (
              <OrderedProduct key={product.id} orderedProduct={product} />
            ))}
          </div>
          <div>
            Total a pagar: S/
            {orderedProducts.reduce(
              (total, orderedProduct) =>
                total + orderedProduct.product.price * orderedProduct.units,
              0
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-1.5">
            <ShoppingBasket className="w-6 h-6" strokeWidth={1.5} />
            <p className="w-full max-w-[200px] text-sm text-center">
              Aún no agregaste ningún producto
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderedProductsContainer;
