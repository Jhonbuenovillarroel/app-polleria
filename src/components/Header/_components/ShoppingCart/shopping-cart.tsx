"use client";

import { ShoppingCartIcon } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShoppingCartProductsContainer from "../ShoppingCartProductsContainer/container";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { Button } from "@/components/ui/button";

const ShoppingCart = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <Sheet
      open={shoppingCartStore.showShoppingCart}
      onOpenChange={shoppingCartStore.shoppingCartIsOpen}
    >
      <SheetTrigger className="cursor-pointer">
        <div className="relative">
          <ShoppingCartIcon className="w-5 h-5" />
          <div className="bg-red-500 rounded-full absolute -top-2.5 -right-3 w-5 h-5 flex items-center justify-center">
            <p className="text-xs text-zinc-100">
              {shoppingCartStore.products.length}
            </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="border-none overflow-y-scroll pt-4 pb-16">
        <SheetHeader>
          <SheetTitle>Resumen de Compra</SheetTitle>
          <SheetDescription>
            Puedes elegir más productos o proceder a realizar el pedido
          </SheetDescription>
        </SheetHeader>

        <div>
          <ShoppingCartProductsContainer />
        </div>

        <SheetFooter>
          {!!shoppingCartStore.products.length && (
            <Button variant={"orangeButton"} className="w-full">
              Realizar Pedido
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
