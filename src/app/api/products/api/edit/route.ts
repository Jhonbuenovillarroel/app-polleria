import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    id,
    name,
    price,
    categories,
    description,
  }: {
    id: string;
    name: string;
    price: string;
    categories: { id: string; value: string }[];
    description: string;
  } = await req.json();

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (product?.name != name) {
      const nameExists = await prisma.product.findUnique({ where: { name } });
      if (nameExists) {
        return NextResponse.json({
          error: "Este nombre de producto ya existe",
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { name },
      data: {
        name,
        price: parseInt(price),
        categories: {
          disconnect: product?.categories.map((categorie) => ({
            id: categorie.id,
          })),
          connect: categories.map((categorie) => ({ id: categorie.id })),
        },
        description,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Producto actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
