import React from "react";
import DataTable from "./_components/DataTable/data-table";
import { getAllOrders } from "@/dbqueries/orders/get-all";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async () => {
  const orders = await getAllOrders();
  return orders;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="w-full flex items-center justify-center">
        <DataTable columns={columns as any} data={data} />
      </section>
    </main>
  );
};

export default Page;
