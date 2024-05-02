import React from "react";
import ProductForm from "../_components/ProductForm/form";
import { getAllCategories } from "@/dbqueries/categories/get-all";

const getData = async () => {
  const categories = await getAllCategories();
  return categories;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex items-center justify-center">
        <ProductForm mode="create" categories={data} />
      </section>
    </main>
  );
};

export default Page;
