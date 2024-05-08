import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary/cloudinary";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const orderedProducts = await prisma.orderedProduct.deleteMany({
      where: { productId: id },
    });
    const removedProduct = await prisma.product.delete({
      where: { id },
      include: { images: true, categories: true, orderedProduct: true },
    });

    for (let image of removedProduct.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    return NextResponse.json({
      ok: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
