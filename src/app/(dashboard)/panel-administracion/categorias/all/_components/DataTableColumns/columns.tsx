"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { productCategory } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import ActionsColumn from "./_components/ActionsColumn/actions";

const columnHelper = createColumnHelper<productCategory>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      );
    },

    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      );
    },
  }),

  columnHelper.accessor("name", {
    id: "Nombre",
    header: () => <span>Nombre</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
