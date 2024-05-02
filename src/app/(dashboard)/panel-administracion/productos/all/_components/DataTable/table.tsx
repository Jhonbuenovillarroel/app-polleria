"use client";

import DataTableGlobal from "@/components/(dashboard)/DataTable/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: Props<TData, TValue>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex items-center justify-center w-full">
      <DataTableGlobal table={table} />
    </div>
  );
};

export default DataTable;
