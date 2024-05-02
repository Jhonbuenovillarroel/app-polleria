import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateSweetAlertPopup } from "@/lib/utils";
import { image } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Props {
  row: Row<image>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md px-2 py-1.5 hover:bg-zinc-300 dark:hover:bg-zinc-800">
        <MoreHorizontal className="w-3 h-3" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3 h-3" strokeWidth={1.5} />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-400 dark:focus:text-red-400"
          onClick={async () => {
            generateSweetAlertPopup({
              title: "Estás seguro de realizar esta acción?",
              subtitle: "La imagen se eliminará de forma permanente",
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                try {
                  const { data } = await axios.post(
                    "/api/images/api/delete-images",
                    [{ id: row.original.id, public_id: row.original.public_id }]
                  );
                  if (data.ok) {
                    generateSweetAlertPopup({
                      icon: "success",
                      title: "Operación Exitosa",
                      subtitle: "La imagen fue eliminada correctamente",
                      confirmButtonText: "Ok",
                    });
                    router.refresh();
                  }
                } catch (error) {
                  Swal.showValidationMessage(
                    "Ocurrió un error durante el proceso, vuelve a intentarlo"
                  );
                }
              },
              showDenyButton: true,
            });
          }}
        >
          <Trash2 className="w-3 h-3" strokeWidth={1.5} />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
