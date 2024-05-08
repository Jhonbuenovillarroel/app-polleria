import { getOrderById } from "@/dbqueries/orders/get-by-id";
import React from "react";
import OrderedProductsContainer from "./_components/OrderedProductsContainer/container";

const getData = async (orderId: string) => {
  const order = await getOrderById(orderId);
  return order;
};

const Page = async ({ params }: { params: { orderId: string } }) => {
  const data = await getData(params.orderId);

  if (data) {
    return (
      <main className="w-full">
        <section className="w-full">
          <OrderedProductsContainer orderedProducts={data.orderedProducts} />
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <section className="px-6 flex items-center justify-center w-full mt-8">
          <p className="w-full max-w-[300px]">
            No existe ningún producto para esta orden
          </p>
        </section>
      </main>
    );
  }
};

export default Page;
