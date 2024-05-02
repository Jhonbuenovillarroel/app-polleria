import prisma from "@/lib/prisma/prisma";

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { categories: true, images: true },
  });
  return product;
};
