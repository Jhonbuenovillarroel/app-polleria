import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  try {
    const categoryExists = await prisma.productCategory.findUnique({
      where: { name },
    });

    if (categoryExists) {
      return NextResponse.json({ error: "La categoría ya existe" });
    }

    const category = await prisma.productCategory.create({ data: { name } });

    return NextResponse.json({
      ok: true,
      message: "Categoría creada correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
