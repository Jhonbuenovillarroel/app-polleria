"use client";

import DataTableGlobal from "@/components/(dashboard)/DataTable/data-table";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import table from "../../../edit/[productId]/images/all/_components/DataTable/table";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: Props<TData, TValue>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 4 } },
    state: { pagination },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <DataTableGlobal table={table} columns={columns} />
      <div className="flex gap-4 items-center justify-center">
        <Button
          variant={"outline"}
          className="flex items-center justify-center"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          className="flex items-center justify-center"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
