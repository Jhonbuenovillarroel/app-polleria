import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, name } = await req.json();

  try {
    const category = await prisma.productCategory.findUnique({ where: { id } });
    if (category?.name !== name) {
      const nameExists = await prisma.productCategory.findUnique({
        where: { name },
      });
      if (nameExists) {
        return NextResponse.json({
          error: "Este nombre de categoría ya existe",
        });
      }
    }

    const updatedCategory = await prisma.productCategory.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Categoría actualizada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
