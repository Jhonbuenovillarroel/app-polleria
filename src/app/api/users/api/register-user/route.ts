import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { name, username, email, password, role } = await req.json();

  try {
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    const emailExists = await prisma.user.findUnique({ where: { email } });

    if (usernameExists) {
      return NextResponse.json({ error: "Este nombre de usuario ya existe" });
    } else if (emailExists) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHashed,
        role,
      },
    });
    return NextResponse.json({
      ok: true,
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
