"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { user } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import ActionsColumn from "../ActionsColumn/actions-column";

const columnHelper = createColumnHelper<user>();

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
  columnHelper.accessor("username", {
    id: "Nombre de usuario",
    header: () => <span>Nombre de Usuario</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("role", {
    id: "Permisos",
    header: () => <span>Permisos</span>,
    cell: (info) => (
      <span>
        {info.getValue() === "admin"
          ? "Administrador"
          : info.getValue() === "colaborator"
          ? "Colaborador"
          : "Cliente"}
      </span>
    ),
  }),
  columnHelper.accessor("email", {
    id: "Correo Electrónico",
    header: () => <span>Correo Electrónico</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
