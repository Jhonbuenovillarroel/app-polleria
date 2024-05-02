import React from "react";
import ProductForm from "../../_components/ProductForm/form";
import { getProductById } from "@/dbqueries/products/get-by-id";
import { product, productCategory } from "@prisma/client";
import { getAllCategories } from "@/dbqueries/categories/get-all";

const getData = async (
  productId: string
): Promise<{
  product: (product & { categories: productCategory[] }) | null;
  categories: productCategory[];
}> => {
  const product = await getProductById(productId);
  const categories = await getAllCategories();
  return { product, categories };
};

const Page = async ({ params }: { params: { productId: string } }) => {
  const data = await getData(params.productId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex items-center justify-center">
        <ProductForm
          mode="edit"
          categories={data.categories}
          product={data.product}
        />
      </section>
    </main>
  );
};

export default Page;
