import React from "react";
import CategoryForm from "../../_components/CategoryForm/form";
import { getCategoryById } from "@/dbqueries/categories/get-by-id";
import { productCategory } from "@prisma/client";

const getData = async (categoryId: string): Promise<productCategory | null> => {
  const category = await getCategoryById(categoryId);
  return category;
};

const Page = async ({ params }: { params: { categoryId: string } }) => {
  const data = await getData(params.categoryId);
  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex items-center justify-center">
        <CategoryForm mode="edit" category={data} />
      </section>
    </main>
  );
};

export default Page;
