import React from "react";
import DataTable from "./_components/DataTable/table";
import { getProductById } from "@/dbqueries/products/get-by-id";
import { image, product, productCategory } from "@prisma/client";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (
  productId: string
): Promise<
  (product & { images: image[]; categories: productCategory[] }) | null
> => {
  const product = await getProductById(productId);
  return product;
};

const Page = async ({ params }: { params: { productId: string } }) => {
  const data = await getData(params.productId);

  return (
    <main className="w-full">
      <section>
        <DataTable
          columns={columns as any}
          data={data?.images as image[]}
          product={data}
        />
      </section>
    </main>
  );
};

export default Page;
