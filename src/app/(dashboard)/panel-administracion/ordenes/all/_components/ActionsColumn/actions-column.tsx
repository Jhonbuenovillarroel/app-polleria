import { order } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Settings, Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { generateSweetAlertPopup } from "@/lib/utils";
import Swal from "sweetalert2";
import Link from "next/link";

interface Props {
  row: Row<order>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md px-2 py-1.5 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all duration-150">
        <MoreHorizontal className="w-4 h-4 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3 h-3" />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          {/* <Dialog>
            <DialogTrigger className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Ver Detalles</span>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog> */}
          <Link
            href={`/panel-administracion/ordenes/${row.original.id}/details`}
            className="w-full h-full flex items-center gap-2"
          >
            <Eye className="w-3 h-3" />
            <span>Ver Detalles</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={async () => {
            generateSweetAlertPopup({
              title: "Estás seguro de realizar esta acción?",
              subtitle:
                "Recuerda que la orden se eliminará de forma permanente y no podrás volver a recuperarla",
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                try {
                  const { data } = await axios.post("/api/orders/api/delete", {
                    id: row.original.id,
                  });

                  if (data.ok) {
                    generateSweetAlertPopup({
                      icon: "success",
                      title: data.message,
                      subtitle:
                        "Recuerda que la operación se eliminó de forma permanente",
                    });
                    router.refresh();
                  }
                } catch (error) {
                  Swal.showValidationMessage(
                    "Algo salió mal durante el proceso"
                  );
                }
              },
              showDenyButton: true,
              denyButtonText: "No, cancelar",
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
