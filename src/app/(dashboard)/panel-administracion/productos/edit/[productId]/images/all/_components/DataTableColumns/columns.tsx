"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { image } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<image>();

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
  columnHelper.accessor("url", {
    id: "Imagen",
    header: () => <span>Imagen</span>,
    cell: (info) => (
      <div>
        <Image
          src={info.getValue()}
          className="w-40"
          width={300}
          height={300}
          alt="Imagen de producto"
        />
      </div>
    ),
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
