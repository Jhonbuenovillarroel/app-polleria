"use client";

import DataTableGlobal from "@/components/(dashboard)/DataTable/data-table";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: Props<TData, TValue>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    initialState: {
      columnFilters: [{ id: "Fecha", value: new Date() }],
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
    state: {
      pagination,
    },
  });

  return (
    <div className="w-full max-w-[800px]">
      <div className="mt-8">
        <div className="flex flex-col gap-2">
          <Label>Filtrar por fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  new Date(table.getColumn("Fecha")?.getFilterValue() as string)
                }
                onSelect={(value) => {
                  table.getColumn("Fecha")?.setFilterValue(value);
                  setDate(value);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DataTableGlobal table={table} columns={columns} />
      <div className="flex items-center justify-center gap-3">
        <Button
          variant={"outline"}
          className="flex items-center justify-center w-fit"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant={"outline"}
          className="flex items-center justify-center w-fit"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
