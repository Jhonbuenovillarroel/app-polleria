import prisma from "@/lib/prisma/prisma";

export const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderedProducts: { include: { product: { include: { images: true } } } },
    },
  });
  return order;
};
