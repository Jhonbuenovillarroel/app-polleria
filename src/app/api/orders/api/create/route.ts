import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { customerData, products } = await req.json();

  try {
    let orderedProducts: { id: string }[] = [];
    for (let product of products) {
      const orderedProduct = await prisma.orderedProduct.create({
        data: {
          units: product.units,
          productId: product.id,
        },
      });
      orderedProducts.push({ id: orderedProduct.id });
    }

    const order = await prisma.order.create({
      data: {
        date: new Date(),
        customerName: customerData.name,
        customerCellPhone: customerData.cellPhone,
        customerAddress: customerData.address,
        products: {
          connect: products.map((product: any) => ({ id: product.id })),
        },
        orderedProducts: {
          connect: orderedProducts,
        },
      },
    });
    return NextResponse.json({
      ok: true,
      message: "Orden creada correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
