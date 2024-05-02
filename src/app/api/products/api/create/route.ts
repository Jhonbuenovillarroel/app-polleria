import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    name,
    price,
    categories,
    description,
  }: {
    name: string;
    price: string;
    categories: { id: string; value: string }[];
    description: string;
  } = await req.json();

  try {
    const productExists = await prisma.product.findUnique({ where: { name } });

    if (productExists) {
      return NextResponse.json({ error: "Este nombre ya existe" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        categories: {
          connect: categories.map((categorie) => ({ id: categorie.id })),
        },
        description: description ? description : null,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Producto creado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
