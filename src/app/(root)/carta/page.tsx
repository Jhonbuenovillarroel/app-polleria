import React, { Suspense } from "react";
import { getAllCategories } from "@/dbqueries/categories/get-all";
import { image, product, productCategory } from "@prisma/client";
import { getAllProducts } from "@/dbqueries/products/get-all";
import ProductsContainer from "./_components/ProductsContainer/container";

const getData = async (
  searchCategories: string[]
): Promise<{
  products: (product & { categories: productCategory[]; images: image[] })[];
}> => {
  const products = await getAllProducts();
  return {
    products: !!searchCategories.length
      ? products.filter((product) => {
          for (let category of searchCategories) {
            for (let productCategory of product.categories) {
              if (category === productCategory.name) {
                return product;
              }
            }
          }
        })
      : products,
  };
};

const Page = async ({
  searchParams,
}: {
  searchParams: { categories: string | undefined };
}) => {
  const data = await getData(
    searchParams.categories ? searchParams.categories.split(",") : []
  );
  return (
    <main className="flex w-full">
      <ProductsContainer products={data.products} />
    </main>
  );
};

export default Page;
