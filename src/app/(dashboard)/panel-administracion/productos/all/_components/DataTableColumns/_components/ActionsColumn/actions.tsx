"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateSweetAlertPopup } from "@/lib/utils";
import { product } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import {
  Image as ImageIcon,
  MoreHorizontal,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

interface Props {
  row: Row<product>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

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
            href={`/panel-administracion/productos/edit/${row.original.id}`}
            className="flex items-center gap-2 w-full h-full"
          >
            <Pencil className="w-3 h-3" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/panel-administracion/productos/edit/${row.original.id}/images/all`}
            className="flex items-center gap-2 w-full h-full"
          >
            <ImageIcon className="w-3 h-3" />
            <span>Ver imágenes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-400 dark:focus:text-red-400"
          onClick={() => {
            generateSweetAlertPopup({
              title: "Estás seguro de realizar esta acción?",
              subtitle: "Esta acción eliminará el producto de forma permanente",
              showDenyButton: true,
              denyButtonText: "No, cancelar",
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                try {
                  const { data } = await axios.post(
                    "/api/products/api/delete",
                    { id: row.original.id }
                  );

                  if (data.ok) {
                    generateSweetAlertPopup({
                      icon: "success",
                      title: "Operación exitosa",
                      subtitle: data.message,
                    });
                    router.refresh();
                  }
                } catch (error) {
                  console.log(error);
                  Swal.showValidationMessage(
                    "Algo salió mal durante el proceso"
                  );
                }
              },
            });
          }}
        >
          <Trash2 className="w-3 h-3" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
