"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { order } from "@prisma/client";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { format, formatISO9075 } from "date-fns";
import {
  Check,
  LoaderIcon,
  MoreHorizontal,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { es } from "date-fns/locale";
import ActionsColumn from "../ActionsColumn/actions-column";
import { formatLocaleDate } from "@/lib/utils";

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
      <p className="min-w-[120px]">
        {format(info.getValue(), "dd/MM/yyyy") ===
        format(new Date(), "dd/MM/yyyy")
          ? "Hoy"
          : format(info.getValue(), `dd 'de' MMMM 'del' yyyy`, { locale: es })}
      </p>
    ),
    filterFn: (row, columnId, filterValue) => {
      const filterDate = format(new Date(filterValue), "dd/MM/yyyy");
      const orderDate = format(new Date(row.original.date), "dd/MM/yyyy");

      if (orderDate === filterDate) {
        return true;
      }
      return false;
    },
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
    cell: (info) => <p className="min-w-[150px]">{info.getValue()}</p>,
  }),
  columnHelper.accessor("status", {
    id: "Estado",
    header: () => <span>Estado</span>,
    cell: (info) => (
      <div
        className={`w-fit px-4 py-[4px] text-xs rounded-full ${
          info.getValue() === "pending"
            ? "bg-zinc-700 text-zinc-200"
            : info.getValue() === "delivered"
            ? "bg-green-700 text-green-300"
            : "bg-red-500 text-red-100"
        }`}
      >
        {info.getValue() === "pending" ? (
          <div className="flex items-center gap-2">
            <LoaderIcon className="w-3 h-3" />
            <span>Pendiente</span>
          </div>
        ) : info.getValue() === "delivered" ? (
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3" />
            <span>Entregado</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <X className="w-3 h-3" />
            <span>Cancelada</span>
          </div>
        )}
      </div>
    ),
  }),
  columnHelper.accessor("customerAddress", {
    id: "Dirección del cliente",
    header: () => <p className="min-w-[180px]">Dirección del cliente</p>,
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
