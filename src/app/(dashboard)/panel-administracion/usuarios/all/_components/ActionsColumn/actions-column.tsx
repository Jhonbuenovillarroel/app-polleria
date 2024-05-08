import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateSweetAlertPopup } from "@/lib/utils";
import { user } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal, Pencil, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

interface Props {
  row: Row<user>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md px-2 py-1.5 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all duration-150">
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3 h-3" />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            href={`/panel-administracion/usuarios/edit/${row.original.id}`}
            className="flex items-center gap-2 w-full h-full"
          >
            <Pencil className="w-3 h-3" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            generateSweetAlertPopup({
              title: "Estás seguro de realizar esta acción?",
              subtitle: "Esta acción eliminará al usuario de forma permanente",
              showDenyButton: true,
              denyButtonText: "No, cancelar",
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                try {
                  const { data } = await axios.post("/api/users/api/delete", {
                    id: row.original.id,
                  });

                  if (data.ok) {
                    generateSweetAlertPopup({
                      icon: "success",
                      title: "Operación Exitosa",
                      subtitle: data.message,
                    });
                    router.refresh();
                  }
                } catch (error) {
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
