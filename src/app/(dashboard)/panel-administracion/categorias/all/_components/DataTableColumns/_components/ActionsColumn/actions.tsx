import { productCategory } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Settings, Trash2 } from "lucide-react";
import React from "react";
import Link from "next/link";

interface Props {
  row: Row<productCategory>;
}

const ActionsColumn = ({ row }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-800 px-2 py-1.5">
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3 h-3" strokeWidth={1.5} />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/panel-administracion/categorias/edit/${row.original.id}`}
            className="flex items-center gap-2 w-full h-full"
          >
            <Pencil className="w-3 h-3" strokeWidth={1.5} />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-red-400 focus:text-red-400 dark:focus:text-red-400">
          <Trash2 className="w-3 h-3" strokeWidth={1.5} />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
