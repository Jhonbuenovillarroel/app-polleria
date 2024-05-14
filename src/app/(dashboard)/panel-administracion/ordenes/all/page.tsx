import React from "react";
import DataTable from "./_components/DataTable/data-table";
import { getAllOrders } from "@/dbqueries/orders/get-all";
import { columns } from "./_components/DataTableColumns/columns";
import PendingOrdersContainer from "./_components/PendingOrdersContainer/container";

const getData = async () => {
  const orders = await getAllOrders();
  return orders;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-16">
        <PendingOrdersContainer orders={data} />
        <DataTable columns={columns as any} data={data} />
      </section>
    </main>
  );
};

export default Page;
