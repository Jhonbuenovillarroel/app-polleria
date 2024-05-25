"use client";

import { generateSweetAlertPopup } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import OrderedProductsContainer from "../../../[orderId]/details/_components/OrderedProductsContainer/container";
import { image, order, orderedProduct, product } from "@prisma/client";
import router from "next/router";
import Swal from "sweetalert2";

interface Props {
  orders: (order & {
    products: product[];
    orderedProducts: (orderedProduct & {
      product: product & { images: image[] };
    })[];
  })[];
}

const PendingOrdersContainer = ({ orders }: Props) => {
  const router = useRouter();

  return (
    <>
      {orders.filter((order) => order.status === "pending").length > 0 && (
        <div className="w-full max-w-[800px] mt-8">
          <div>
            <h2 className="font-medium">Pendiente de entrega</h2>

            <div className="py-8">
              {orders
                .filter((order) => order.status === "pending")
                .map((order) => (
                  <div
                    key={order.id}
                    className="text-sm flex flex-col sm:justify-between sm:flex-row items-center gap-6 border-t border-zinc-300 dark:border-zinc-800 py-6"
                  >
                    <div className="flex gap-6 items-center">
                      <div className="flex flex-col gap-1">
                        <p>{order.customerName}</p>
                        <p>{order.customerCellPhone}</p>
                      </div>

                      <Dialog>
                        <DialogTrigger className="h-7 rounded-full text-[13px] px-6 bg-orange-500 hover:bg-orange-400 transition-all duration-100">
                          Ver Detalles
                        </DialogTrigger>
                        <DialogContent className="w-fit py-0">
                          {orders ? (
                            <>
                              <div className="w-full">
                                <OrderedProductsContainer
                                  orderedProducts={order.orderedProducts}
                                />
                              </div>
                            </>
                          ) : (
                            <div className="px-6 flex items-center justify-center w-full mt-8">
                              <p className="w-full max-w-[300px]">
                                No existe ningún producto para esta orden
                              </p>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-col items-center md:flex-row gap-3 text-white">
                      <button
                        onClick={async () => {
                          generateSweetAlertPopup({
                            title: "Estás seguro de continuar?",
                            subtitle:
                              "Esta acción cambiará el estado de la orden a completada",
                            preConfirm: async () => {
                              try {
                                const { data } = await axios.post(
                                  "/api/orders/api/change-order-status",
                                  { id: order.id, status: "delivered" }
                                );
                                if (data.ok) {
                                  generateSweetAlertPopup({
                                    icon: "success",
                                    title: "Operación exitosa",
                                    subtitle:
                                      "Se cambió el estado de la orden a entregada",
                                    confirmButtonText: "Ok",
                                  }).then((result) => {
                                    router.refresh();
                                  });
                                }
                              } catch (error) {
                                Swal.showValidationMessage(
                                  "Algo salió mal durante el proceso, vuelve a intentarlo"
                                );
                              }
                            },
                            showLoaderOnConfirm: true,
                            showDenyButton: true,
                            denyButtonText: "No, cancelar",
                          });
                        }}
                        className="flex bg-green-700 hover:bg-green-600 w-fit h-8 px-4 rounded-full items-center gap-2 text-[13px] transition-all duration-150"
                      >
                        <Check className="w-3 h-3" />
                        <span>Marcar como entregado</span>
                      </button>
                      <button
                        onClick={async () => {
                          generateSweetAlertPopup({
                            title: "Estás seguro de continuar?",
                            subtitle:
                              "Esta acción cambiará el estado de la orden a cancelada",
                            preConfirm: async () => {
                              try {
                                const { data } = await axios.post(
                                  "/api/orders/api/change-order-status",
                                  { id: order.id, status: "cancelled" }
                                );
                                if (data.ok) {
                                  generateSweetAlertPopup({
                                    icon: "success",
                                    title: "Operación exitosa",
                                    subtitle: "Se canceló la orden",
                                    confirmButtonText: "Ok",
                                  }).then((result) => {
                                    router.refresh();
                                  });
                                }
                              } catch (error) {
                                Swal.showValidationMessage(
                                  "Algo salió mal durante el proceso, vuelve a intentarlo"
                                );
                              }
                            },
                            showLoaderOnConfirm: true,
                            showDenyButton: true,
                            denyButtonText: "No, cancelar",
                          });
                        }}
                        className="flex bg-red-600 hover:bg-red-500 w-fit h-8 px-4 rounded-full items-center gap-2 text-[13px] transition-all duration-150"
                      >
                        <X className="w-3 h-3" />
                        <span>Cancelar Pedido</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingOrdersContainer;
