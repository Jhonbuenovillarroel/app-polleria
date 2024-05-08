"use client";

import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { ShoppingBasket } from "lucide-react";
import React from "react";
import OrderSummaryProduct from "../OrderSummaryProduct/product";

const OrderSummaryProductsContainer = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <div className="mt-4 w-full">
      {!!shoppingCartStore.products.length ? (
        <div className="flex flex-col gap-2 w-full">
          {shoppingCartStore.products.map((product) => (
            <OrderSummaryProduct key={product.id} product={product} />
          ))}
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

export default OrderSummaryProductsContainer;
