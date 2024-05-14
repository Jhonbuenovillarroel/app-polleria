import React from "react";
import HeroSection from "./_components/HeroSection/hero";
import MenuSection from "./_components/MenuSection/section";
import OpeningHoursSection from "./_components/OpeningHoursSection/section";
import { getAllProducts } from "@/dbqueries/products/get-all";
import { getAllCategories } from "@/dbqueries/categories/get-all";

const getData = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return { products, categories };
};

const Page = async () => {
  const data = await getData();

  return (
    <main>
      <HeroSection />
      <MenuSection products={data.products} categories={data.categories} />
      <OpeningHoursSection />
    </main>
  );
};

export default Page;
