import React from "react";
import CategoryFilters from "./_components/CategoryFilters/category-filters";
import { getAllCategories } from "@/dbqueries/categories/get-all";

const getData = async () => {
  const categories = await getAllCategories();
  return categories;
};

const Page = async ({
  searchParams,
}: {
  searchParams: { categories: string };
}) => {
  const data = await getData();
  return (
    <div className="w-60 shrink-0 grow-0 py-10 px-6 h-[500px]">
      <CategoryFilters
        categories={data}
        categorySearchParameter={searchParams.categories}
      />
    </div>
  );
};

export default Page;
