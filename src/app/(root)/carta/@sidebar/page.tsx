import React from "react";
import CategoryFilters from "./_components/CategoryFilters/category-filters";
import { getAllCategories } from "@/dbqueries/categories/get-all";
import SideBar from "./_components/SideBar/sidebar";

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
    <SideBar
      categories={data}
      categorySearchParameter={searchParams.categories}
    />
  );
};

export default Page;
