import React from "react";
import OrderSummaryProductsContainer from "../OrderSummaryProductsContainer/container";
import Link from "next/link";
import { Plus } from "lucide-react";

const OrderSummary = () => {
  return (
    <div className="w-full max-w-[320px]">
      <h2 className="font-semibold">Resumen de orden:</h2>
      <OrderSummaryProductsContainer />
      <Link
        href={`/carta`}
        className="flex items-center justify-center h-10 rounded-md gap-2 bg-orange-500 text-white mt-6 text-sm hover:bg-orange-400   transition-all duration-150"
      >
        <span>Agregar más productos</span>
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
      </Link>
    </div>
  );
};

export default OrderSummary;
