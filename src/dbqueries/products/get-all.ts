import prisma from "@/lib/prisma/prisma";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: { categories: true, images: true },
  });
  return products;
};
