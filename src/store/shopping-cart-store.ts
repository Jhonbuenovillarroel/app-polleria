import { image, product, productCategory } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ShoppingCartProductType extends product {
  categories: productCategory[];
  images: image[];
  units: number;
}

interface ShoppingCartStoreType {
  products: ShoppingCartProductType[];
  addProduct: (product: ShoppingCartProductType) => void;
  removeProduct: (id: string) => void;
  increaseProductUnits: (id: string) => void;
  decreaseProductUnits: (id: string) => void;
  shoppingCartIsOpen: (option: boolean) => void;
  showShoppingCart: boolean;
}

export const useShoppingCartStore = create<ShoppingCartStoreType>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => set({ products: [...get().products, product] }),
      removeProduct: (id) =>
        set({
          products: [...get().products.filter((product) => product.id !== id)],
        }),
      increaseProductUnits: (id) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
                product.units = product.units + 1;
                return product;
              }
              return product;
            }),
          ],
        });
      },
      decreaseProductUnits: (id) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
                if (product.units > 1) {
                  product.units = product.units - 1;
                }
                return product;
              }
              return product;
            }),
          ],
        });
      },
      shoppingCartIsOpen: (option: boolean) =>
        set({ showShoppingCart: option }),
      showShoppingCart: false,
    }),
    {
      name: "shopping-cart-storage",
    }
  )
);
