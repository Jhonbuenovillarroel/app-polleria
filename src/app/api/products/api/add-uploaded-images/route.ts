import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { images, id } = await req.json();

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { images: { createMany: { data: images } } },
    });
    return NextResponse.json({
      ok: true,
      message: "Imagenes subidas correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
