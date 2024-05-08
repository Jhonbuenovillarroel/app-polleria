import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const removedOrder = await prisma.order.delete({ where: { id } });
    return NextResponse.json(
      { ok: true, message: "Orden eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
