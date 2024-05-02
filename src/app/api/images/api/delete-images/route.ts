import { cloudinary } from "@/lib/cloudinary/cloudinary";
import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const images = (await req.json()) as { id: string; public_id: string }[];

  try {
    for (let image of images) {
      const removedImage = await prisma.image.delete({
        where: { id: image.id },
        include: { product: true, user: true },
      });
      const response = await cloudinary.uploader.destroy(image.public_id);
    }
    return NextResponse.json({
      ok: true,
      message: "Imagenes eliminadas correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
