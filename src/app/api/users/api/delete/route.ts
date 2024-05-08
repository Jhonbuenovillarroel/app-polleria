import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const removedUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json({
      ok: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
