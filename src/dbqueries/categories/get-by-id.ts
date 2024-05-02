import prisma from "@/lib/prisma/prisma";

export const getCategoryById = async (id: string) => {
  const category = await prisma.productCategory.findUnique({ where: { id } });
  return category;
};
