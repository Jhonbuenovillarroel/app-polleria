import { product } from "@prisma/client";
import React from "react";
import DataTable from "./_components/DataTable/table";
import { columns } from "./_components/DataTableColumns/columns";
import { getAllProducts } from "@/dbqueries/products/get-all";

const getData = async (): Promise<product[]> => {
  const products = await getAllProducts();
  return products;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section>
        <DataTable columns={columns as any} data={data} />
      </section>
    </main>
  );
};

export default Page;
