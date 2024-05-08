import React from "react";
import DataTable from "./_components/DataTable/data-table";
import { getAllUsers } from "@/dbqueries/users/get-all";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async () => {
  const users = await getAllUsers();
  return users;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="w-full">
        <DataTable columns={columns as any} data={data} />
      </section>
    </main>
  );
};

export default Page;
