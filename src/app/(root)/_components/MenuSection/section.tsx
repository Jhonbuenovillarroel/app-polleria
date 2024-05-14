import { image, product, productCategory } from "@prisma/client";
import React from "react";
import { ChevronRight, ShoppingBasket } from "lucide-react";
import MenuItem from "../MenuItem/menu-item";
import Link from "next/link";

interface Props {
  products: (product & { categories: productCategory[]; images: image[] })[];
  categories: (productCategory & { products: product[] })[];
}

const MenuSection = ({ products, categories }: Props) => {
  return (
    <section className="pt-12 pb-20 flex flex-col gap-12 px-4">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
        Nuestros Productos
      </h2>

      {!!categories.length && (
        <>
          {categories.map(
            (category) =>
              !!category.products.length && (
                <div key={category.id}>
                  {
                    <div key={category.id}>
                      <div
                        key={category.id}
                        className="max-w-[900px] mx-auto w-full"
                      >
                        <div className="flex items-center pb-8 pt-4 justify-between">
                          <h2 className="font-medium text-xl">
                            {category.name}
                          </h2>
                          <Link
                            href={`/carta?categories=${[category.name]}`}
                            className="text-[#FCAA56] text-sm sm:text-base flex items-center gap-1.5 hover:text-[#FFB972] transition-all duration-150"
                          >
                            <span>Ver todos</span>
                            <ChevronRight className="w-4 h-4 " />
                          </Link>
                        </div>
                        {!!category.products.length ? (
                          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-12">
                            {products
                              .filter((product) =>
                                product.categories
                                  .map((category) => category.name)
                                  .includes(category.name)
                              )
                              .map((product) => (
                                <MenuItem key={product.id} product={product} />
                              ))}
                          </div>
                        ) : (
                          <div className="w-full flex flex-col gap-2 items-center justify-center">
                            <ShoppingBasket
                              className="w-5 h-5"
                              strokeWidth={1.5}
                            />
                            <p className="w-full max-w-[280px] text-center">
                              No hay productos disponibles
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              )
          )}
        </>
      )}
    </section>
  );
};

export default MenuSection;
