"use client";

import React from "react";
import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
}

const DataTableGlobal: <TData, TValue>({
  table,
  columns,
}: DataTableProps<TData, TValue>) => JSX.Element = ({ table, columns }) => {
  return (
    <div className="border w-full max-w-[800px] mt-12 mb-12 rounded-md border-zinc-300 dark:border-zinc-800">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {!!table.getRowModel().rows.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-t border-zinc-300 dark:border-zinc-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="border-t border-zinc-300 dark:border-zinc-800 py-10 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableGlobal;
