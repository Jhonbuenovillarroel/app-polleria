"use client";

import DataTableGlobal from "@/components/(dashboard)/DataTable/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import UploadImages from "../UploadImages/upload-images";
import { product } from "@prisma/client";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  product: product | null;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  product,
}: Props<TData, TValue>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col mt-10 items-center justify-center w-full">
      <UploadImages product={product} />
      <DataTableGlobal table={table} columns={columns} />
    </div>
  );
};

export default DataTable;
