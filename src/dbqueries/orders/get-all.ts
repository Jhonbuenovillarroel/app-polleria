import prisma from "@/lib/prisma/prisma";

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      products: true,
      orderedProducts: { include: { product: { include: { images: true } } } },
    },
  });
  return orders;
};
