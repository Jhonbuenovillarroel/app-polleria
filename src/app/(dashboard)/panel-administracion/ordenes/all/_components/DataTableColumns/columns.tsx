"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { order } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { format, formatISO9075 } from "date-fns";
import { MoreHorizontal, Settings, Trash2 } from "lucide-react";
import { es } from "date-fns/locale";
import ActionsColumn from "../ActionsColumn/actions-column";

const columnHelper = createColumnHelper<order>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      );
    },
  }),
  columnHelper.accessor("date", {
    id: "Fecha",
    header: () => <span>Fecha</span>,
    cell: (info) => (
      <span>
        {format(info.getValue(), `dd 'de' MMMM 'del' yyyy`, { locale: es })}
      </span>
    ),
  }),
  columnHelper.accessor("date", {
    id: "Hora",
    header: () => <span>Hora</span>,
    cell: (info) => (
      <span>{formatISO9075(info.getValue(), { representation: "time" })}</span>
    ),
  }),
  columnHelper.accessor("customerName", {
    id: "Nombre del cliente",
    header: () => <span>Nombre del cliente</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("customerAddress", {
    id: "Dirección del cliente",
    header: () => <span>Dirección del cliente</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("customerCellPhone", {
    id: "Celular/Teléfono del cliente",
    header: () => <span>Celular/Teléfono del cliente</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
