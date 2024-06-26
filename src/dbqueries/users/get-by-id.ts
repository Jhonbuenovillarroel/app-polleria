import prisma from "@/lib/prisma/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};
