import React from "react";
import DataTable from "./_components/DataTable/data-table";
import { columns } from "./_components/DataTableColumns/columns";
import { getAllCategories } from "@/dbqueries/categories/get-all";
import { productCategory } from "@prisma/client";

const getData = async (): Promise<productCategory[]> => {
  const categories = await getAllCategories();
  return categories;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="w-full max-w-[800px] mx-auto">
        <DataTable columns={columns as any} data={data} />
      </section>
    </main>
  );
};

export default Page;
