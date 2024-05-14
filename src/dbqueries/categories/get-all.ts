import prisma from "@/lib/prisma/prisma";

export const getAllCategories = async () => {
  const categories = await prisma.productCategory.findMany({
    include: { products: true },
  });
  return categories;
};
