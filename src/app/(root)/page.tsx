import React from "react";
import HeroSection from "./_components/HeroSection/hero";
import MenuSection from "./_components/MenuSection/section";
import OpeningHoursSection from "./_components/OpeningHoursSection/section";
import { getAllProducts } from "@/dbqueries/products/get-all";

const getData = async () => {
  const products = await getAllProducts();
  return products;
};

const Page = async () => {
  const data = await getData();

  return (
    <main>
      <HeroSection />
      <MenuSection products={data} />
      <OpeningHoursSection />
    </main>
  );
};

export default Page;
